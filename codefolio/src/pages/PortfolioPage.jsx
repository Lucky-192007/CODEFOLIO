import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    return <h1>Portfolio Not Found</h1>;
  }

  const templates = {
    minimal: MinimalTemplate,
    cyberpunk: CyberpunkTemplate,
    corporate: CorporateTemplate,
  };

  const SelectedTemplate =
    templates[portfolio.templateId] || MinimalTemplate;
    console.log(portfolio);

  return <SelectedTemplate portfolio={portfolio} />;
}

export default PortfolioPage;