import { useNavigate } from "react-router-dom";
import { ChevronDown, Sparkles, ShieldCheck, Layers, Cpu } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#242424] text-slate-200 font-sans antialiased selection:bg-purple-500/30 selection:text-white">
      
      {/* Hero Header Accent */}
      <div className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 w-full" />

      {/* Section 1: Hero Pitch */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center px-6 text-center relative">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm shadow-md">
            V
          </div>
          <span className="font-bold tracking-tight text-white uppercase text-xs">PortfoliEngine</span>
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Portfolio Engine Active
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Deploy Your Executive Link <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              In Less Than Minutes.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed">
            An automated dashboard environment crafted to store, format, and generate beautiful developer summaries and case studies natively.
          </p>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition animate-bounce cursor-pointer"
        >
          Explore Platform Structure
          <ChevronDown className="w-4 h-4" />
        </button>
      </section>

      {/* Section 2: Features & Smooth Call to Action */}
      <section id="cta-section" className="bg-[#1a1a1a] border-t border-white/5 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          
          {/* Quick Value Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-[#242424] border border-white/5 rounded-2xl">
              <Cpu className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic Themes</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">Switch configurations dynamically between stark executive metrics and lightweight components.</p>
            </div>
            <div className="p-6 bg-[#242424] border border-white/5 rounded-2xl">
              <Layers className="w-6 h-6 text-indigo-400 mb-3" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Case Collections</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">Isolate production-grade systems summaries safely inside standard responsive layouts.</p>
            </div>
            <div className="p-6 bg-[#242424] border border-white/5 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Secure State</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">Your data persists directly safely tied inside clean, mock context authentication wrappers.</p>
            </div>
          </div>

          {/* Interactive Call to Action Button */}
          <div className="space-y-4 pt-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to construct your professional node?
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Get access to the layout fields immediately. No long enterprise validation loops needed.
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => navigate("/auth")}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-purple-900/20 cursor-pointer"
              >
                Make Your Portfolio
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer minimal signature */}
      <footer className="py-8 text-center text-[10px] uppercase tracking-widest text-slate-600 bg-[#1a1a1a] border-t border-white/5">
        Powered by React Vite Sandbox • {new Date().getFullYear()}
      </footer>

    </div>
  );
}

export default LandingPage;