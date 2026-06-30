const User = require("../models/User");

let stripeClient = null;

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;

  if (!stripeClient) {
    const Stripe = require("stripe");
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeClient;
}

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();

    if (!stripe || !process.env.STRIPE_PRICE_ID) {
      return res.status(503).json({
        message:
          "Stripe checkout is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID in backend .env, or hide the Pro button until deployment.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isPro) {
      return res.status(200).json({
        message: "You are already a Pro user.",
        alreadyPro: true,
      });
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName || user.username,
        metadata: {
          userId: String(user._id),
          username: user.username,
        },
      });

      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${clientUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/billing/cancel`,
      metadata: {
        userId: String(user._id),
      },
      subscription_data: {
        metadata: {
          userId: String(user._id),
        },
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("CREATE CHECKOUT SESSION ERROR:", error.message);
    res.status(500).json({ message: "Unable to start checkout right now." });
  }
};

const getBillingStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "isPro stripeCustomerId stripeSubscriptionId proActivatedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      isPro: user.isPro,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId,
      proActivatedAt: user.proActivatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch billing status." });
  }
};

const stripeWebhook = async (req, res) => {
  try {
    const stripe = getStripe();

    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      return res.status(503).json({ message: "Stripe webhook is not configured." });
    }

    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;

      if (userId) {
        await User.findByIdAndUpdate(userId, {
          isPro: true,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          proActivatedAt: new Date(),
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;

      await User.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        {
          isPro: false,
          stripeSubscriptionId: "",
        }
      );
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object;

      if (invoice.subscription) {
        await User.findOneAndUpdate(
          { stripeSubscriptionId: invoice.subscription },
          { isPro: false }
        );
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("STRIPE WEBHOOK ERROR:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = {
  createCheckoutSession,
  getBillingStatus,
  stripeWebhook,
};
