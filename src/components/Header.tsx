import { useState } from "react";
import { ChevronDown, Menu, User, X } from "lucide-react";

const navLinks = [
  "ThéraSéréna",
  "LineCoaching",
  "TheraSomnia",
  "LineCoaching Forme",
  "ThéraFémina",
  "Dossiers",
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-2xl font-extrabold tracking-tight text-mnh-navy">
            MN<span className="text-mnh-orange">H</span>
          </span>
          <div className="hidden sm:flex flex-col text-[10px] leading-tight text-muted-foreground">
            <span>En partenariat avec</span>
            <span className="font-semibold text-mnh-teal text-xs">
              MétaCoaching{" "}
              <span className="text-mnh-orange">Santé</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                link === "Dossiers"
                  ? "text-foreground border-b-2 border-foreground pb-0.5"
                  : "text-muted-foreground"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* User + Mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-border rounded-full px-3 py-1.5 cursor-pointer hover:bg-secondary transition-colors">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Syl</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card px-6 py-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link}
                className={`text-sm font-medium text-left transition-colors hover:text-accent ${
                  link === "Dossiers"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
