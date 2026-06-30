import { useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import MinimalTemplate from "../templates/MinimalTemplate";
import CyberpunkTemplate from "../templates/CyberpunkTemplate";
import CorporateTemplate from "../templates/CorporateTemplate";

// This is the "preview my own portfolio while logged in" page.
// It does NOT call the API by username — it just renders whatever is
// currently in PortfolioContext (the live editable data), so it always
// matches what's in the dashboard, even for unsaved changes.
function MyPortfolioPreview() {
  const { templateId, incrementViews } = usePortfolio();

  useEffect(() => {
    incrementViews();
  }, [incrementViews]);

  const templateMap = {
    minimal: MinimalTemplate,
    cyberpunk: CyberpunkTemplate,
    corporate: CorporateTemplate,
  };

  const SelectedTemplate = templateMap[templateId] || MinimalTemplate;

  // No "portfolio" prop passed — MinimalTemplate falls back to context internally.
  // CyberpunkTemplate/CorporateTemplate already read directly from context.
  return <SelectedTemplate />;
}

export default MyPortfolioPreview;
