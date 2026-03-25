import { Apple, Moon, SmilePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  subcategories: string[];
}

interface DesktopCategoryNavProps {
  categories: Category[];
  activeCategory: string;
  activeSubcategory: string;
  onCategoryChange: (id: string) => void;
  onSubcategoryChange: (sub: string) => void;
}

const DesktopCategoryNav = ({
  categories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: DesktopCategoryNavProps) => {
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="space-y-4">
      {/* Row 1: Main category pills with icons */}
      <div className="flex items-center justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200",
              cat.id === activeCategory
                ? "bg-mnh-teal text-primary-foreground shadow-md"
                : "bg-secondary text-foreground hover:bg-muted hover:shadow-sm"
            )}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Row 2: Subcategory pills */}
      {activeCat && activeCat.subcategories.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {activeCat.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => onSubcategoryChange(sub)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                sub === activeSubcategory
                  ? "border-mnh-teal text-mnh-teal bg-mnh-teal/10"
                  : "border-border text-muted-foreground hover:border-mnh-teal/50 hover:text-foreground"
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

export default DesktopCategoryNav;
