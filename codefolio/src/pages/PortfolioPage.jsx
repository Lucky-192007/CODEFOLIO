import { useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import MinimalTemplate from "../templates/MinimalTemplate";
import CyberpunkTemplate from "../templates/CyberpunkTemplate";
import CorporateTemplate from "../templates/CorporateTemplate";

function PortfolioPage() {
  const { templateId, incrementViews } = usePortfolio();

  useEffect(() => {
    // Increment visitor count when the live portfolio page or preview is loaded
    incrementViews();
  }, [incrementViews]);

  const templateMap = {
    minimal: MinimalTemplate,
    cyberpunk: CyberpunkTemplate,
    corporate: CorporateTemplate,
  };

  const PortfolioLayout =
    templateMap[templateId] || MinimalTemplate;

  return <PortfolioLayout />;
}

export default PortfolioPage;
