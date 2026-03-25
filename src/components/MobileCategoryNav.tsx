import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileCategoryNavProps {
  categories: { id: string; label: string; subcategories: string[] }[];
  activeCategory: string;
  activeSubcategory: string;
  onCategoryChange: (id: string) => void;
  onSubcategoryChange: (sub: string) => void;
}

const MobileCategoryNav = ({
  categories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: MobileCategoryNavProps) => {
  const catRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const activeCat = categories.find((c) => c.id === activeCategory);

  // Scroll active pill into view
  useEffect(() => {
    const activeEl = catRef.current?.querySelector('[data-active="true"]');
    activeEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCategory]);

  useEffect(() => {
    const activeEl = subRef.current?.querySelector('[data-active="true"]');
    activeEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeSubcategory]);

  return (
    <div className="lg:hidden sticky top-[57px] z-40 bg-card border-b border-border">
      {/* Row 1: Main categories */}
      <div
        ref={catRef}
        className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hidden"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            data-active={cat.id === activeCategory}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              cat.id === activeCategory
                ? "bg-mnh-teal text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Row 2: Subcategories */}
      {activeCat && activeCat.subcategories.length > 0 && (
        <div
          ref={subRef}
          className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hidden"
        >
          {activeCat.subcategories.map((sub) => (
            <button
              key={sub}
              data-active={sub === activeSubcategory}
              onClick={() => onSubcategoryChange(sub)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                sub === activeSubcategory
                  ? "border-mnh-teal text-mnh-teal bg-mnh-teal/10"
                  : "border-border text-muted-foreground hover:border-mnh-teal/50"
              )}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileCategoryNav;
