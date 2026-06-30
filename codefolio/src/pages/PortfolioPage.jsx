import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MinimalTemplate from "../templates/MinimalTemplate";
import CyberpunkTemplate from "../templates/CyberpunkTemplate";
import CorporateTemplate from "../templates/CorporateTemplate";

import { getPublicPortfolio } from "../api/portfolioApi";

function PortfolioPage() {
  const { username } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await getPublicPortfolio(username);
        setPortfolio(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, [username]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!portfolio) {
    return (
      <>
        <Helmet>
          <title>Portfolio Not Found | CodeFolio</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1>Portfolio Not Found</h1>
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

        {/* Open Graph (Facebook, LinkedIn, WhatsApp previews) */}
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