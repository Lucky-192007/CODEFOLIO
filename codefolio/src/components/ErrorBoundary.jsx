import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

// Phase 6.5 — Final Production Ready
// Catches unexpected render-time crashes anywhere in the tree below it,
// so a bug in one component doesn't take down the whole app with a blank
// white screen. Wrap <App /> with this in main.jsx.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to an error-tracking service
    // (Sentry, LogRocket, etc.) instead of just logging it.
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0613] text-slate-200 flex flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-6 bg-rose-600/20 blur-3xl rounded-full" />
            <AlertTriangle className="relative w-14 h-14 text-rose-400" />
          </div>

          <h1 className="text-2xl font-black text-white">
            Something went wrong.
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            An unexpected error occurred while rendering this page. Try
            reloading — if the problem persists, please let us know.
          </p>

          <button
            onClick={this.handleReload}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold uppercase tracking-wide shadow-md shadow-purple-600/20 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;