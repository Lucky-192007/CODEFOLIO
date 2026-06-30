import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SearchX, Home } from "lucide-react";

import MinimalTemplate from "../templates/MinimalTemplate";
import CyberpunkTemplate from "../templates/CyberpunkTemplate";
import CorporateTemplate from "../templates/CorporateTemplate";
import LoadingScreen from "../components/LoadingScreen";

import { getPublicPortfolio } from "../api/portfolioApi";

// Reserved app routes that should never be treated as a username and
// trigger a wasted/incorrect API call. Add any other top-level route
// paths here as the app grows.
const RESERVED_PATHS = [
  "login",
  "signup",
  "register",
  "auth",
  "dashboard",
  "profile",
  "projects",
  "skills",
  "theme",
  "preview",
  "portfolio",
  "reset-password",
];

function PortfolioPage() {
  const { username } = useParams();
  const isReserved = RESERVED_PATHS.includes(username?.toLowerCase());

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(!isReserved);

  useEffect(() => {
    if (isReserved) {
      setLoading(false);
      setPortfolio(null);
      return;
    }

    let cancelled = false;

    async function loadPortfolio() {
      setLoading(true);
      try {
        const data = await getPublicPortfolio(username);
        if (!cancelled) setPortfolio(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setPortfolio(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPortfolio();
    return () => {
      cancelled = true;
    };
  }, [username, isReserved]);

  if (loading) {
    return <LoadingScreen label="Loading portfolio..." />;
  }

  if (!portfolio) {
    return (
      <>
        <Helmet>
          <title>Portfolio Not Found | CodeFolio</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen bg-[#0b0613] text-slate-200 flex flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-6 bg-purple-600/20 blur-3xl rounded-full" />
            <SearchX className="relative w-14 h-14 text-purple-400" />
          </div>
          <h1 className="text-2xl font-black text-white">
            Portfolio Not Found
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            No public portfolio exists at <span className="font-mono text-slate-300">/{username}</span>.
            Double-check the link, or the owner may not have published it yet.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold uppercase tracking-wide shadow-md shadow-purple-600/20 transition"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  const templates = {
    minimal: MinimalTemplate,
    cyberpunk: CyberpunkTemplate,
    corporate: CorporateTemplate,
  };

  const SelectedTemplate =
    templates[portfolio.templateId] || MinimalTemplate;

  const pageTitle = portfolio.fullName
    ? `${portfolio.fullName} — ${portfolio.title || "Portfolio"}`
    : "Developer Portfolio";

  const pageDescription =
    portfolio.bio ||
    `Check out ${portfolio.fullName || "this developer"}'s projects, skills, and experience.`;

  const pageUrl = `${window.location.origin}/${portfolio.username}`;
  const pageImage = portfolio.photo || `${window.location.origin}/og-default.png`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp, Discord, Slack previews) */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />

        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <SelectedTemplate portfolio={portfolio} />
    </>
  );
}

export default PortfolioPage;