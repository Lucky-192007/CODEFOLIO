import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";

// Phase 6.4 — Portfolio Sharing
// Pure frontend: no backend calls, just builds share URLs for each platform.
//
// Note: LinkedIn and Twitter/X icons are inlined as raw SVGs instead of
// importing from lucide-react, since those brand icons have been removed
// from newer lucide-react versions and importing them throws a build error
// ("does not provide an export named 'Twitter'/'Linkedin'").
function ShareMenu() {
  const { theme, profile } = usePortfolio();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const isDark = theme === "dark";
  const username = user?.username;
  const publicUrl = username
    ? `${window.location.origin}/${username}`
    : window.location.origin;

  const shareText = profile.fullName
    ? `Check out ${profile.fullName}'s developer portfolio!`
    : "Check out my developer portfolio!";

  const portalRef = useRef(null);

  // Close on outside click — has to check both the trigger button and the
  // portaled dropdown, since the dropdown no longer lives inside menuRef
  // once it's rendered into document.body.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        portalRef.current && !portalRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recalculate the dropdown's screen position whenever it opens, and keep
  // it pinned to the button while the page scrolls or resizes.
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 256; // matches w-64 below
      setMenuPos({
        top: rect.bottom + window.scrollY + 8,
        left: Math.min(
          rect.right + window.scrollX - menuWidth,
          window.innerWidth - menuWidth - 12
        ),
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const LinkedInIcon = (
    <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );

  const TwitterIcon = (
    <svg className="w-4 h-4 text-sky-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14.009-7.496 14.009-13.986 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.046-.02z"/>
    </svg>
  );

  const shareLinks = [
    {
      label: "Share on LinkedIn",
      icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        publicUrl
      )}`,
    },
    {
      label: "Share on Twitter",
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(publicUrl)}`,
    },
    {
      label: "Share on WhatsApp",
      icon: <MessageCircle className="w-4 h-4 text-emerald-500" />,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${publicUrl}`)}`,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide shadow-md shadow-purple-600/10 transition-all flex items-center gap-1.5"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>

      {open && createPortal(
        <div
          ref={portalRef}
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left }}
          className={`w-64 rounded-2xl border shadow-xl z-[999] overflow-hidden ${
            isDark
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          <button
            onClick={handleCopy}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition text-left ${
              isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"
            }`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
            {copied ? "Link Copied!" : "Copy Link"}
          </button>

          <div className={`h-px ${isDark ? "bg-slate-800" : "bg-slate-100"}`} />

          {shareLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${
                isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"
              }`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

export default ShareMenu;