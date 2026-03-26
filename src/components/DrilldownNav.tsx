import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryNode } from "@/data/categories";
import { useRef, useEffect } from "react";

interface DrilldownNavProps {
  roots: CategoryNode[];
  activeRootId: string;
  activeNodeId: string | null;
  currentChildren: CategoryNode[];
  parentLabel: string | null;
  activeColor?: string;
  onRootChange: (id: string) => void;
  onChildSelect: (id: string) => void;
  onBack: () => void;
  isMobile?: boolean;
}

const DrilldownNav = ({
  roots,
  activeRootId,
  activeNodeId,
  currentChildren,
  parentLabel,
  activeColor = "bg-mnh-teal",
  onRootChange,
  onChildSelect,
  onBack,
  isMobile = false
}: DrilldownNavProps) => {
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = subRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeNodeId]);

  return (
    <div className={cn("",
    isMobile ?
    "lg:hidden sticky top-[57px] z-40 bg-card border-b border-border" :
    "space-y-4"
    )}>
      {/* Row 1: Root categories */}
      <div className={cn(
        "flex gap-2",
        isMobile ?
        "px-4 py-3 overflow-x-auto scrollbar-hidden" :
        "items-center justify-start gap-4"
      )}>
        {roots.map((cat) => {
          const isActive = cat.id === activeRootId;
          const activeColor = cat.color || "bg-mnh-teal";
          return (
          <button
            key={cat.id}
            onClick={() => onRootChange(cat.id)}
            className={cn(
              "shrink-0 rounded-full font-semibold transition-all duration-200",
              isMobile ?
              "px-4 py-2 text-sm" :
              "flex items-center gap-2.5 px-6 py-3 text-sm",
              isActive ?
              `${activeColor} text-primary-foreground shadow-md` :
              "bg-secondary text-foreground hover:bg-muted hover:shadow-sm"
            )}>
            {!isMobile && cat.icon}
            {isMobile ? cat.label.replace(/ et Forme$/, "").replace(/^Le /, "").replace(/ du /, " ").replace(/^Gestion /, "") : cat.label}
          </button>
          );
        })}
      </div>

      {/* Row 2: Children of active node */}
      {currentChildren.length > 0 &&
      <div
        ref={subRef}
        className={cn(
          "flex gap-2 transition-all duration-300 ease-in-out",
          isMobile ?
          "px-4 pb-3 overflow-x-auto scrollbar-hidden" :
          "items-center justify-start gap-3"
        )}>
        
          {/* Back button when deeper than level 1 */}
          {parentLabel &&
        <button
          onClick={onBack}
          className={cn(
            "shrink-0 flex items-center gap-1.5 rounded-full font-medium transition-all duration-200",
            "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground",
            isMobile ?
            "px-3 py-1.5 text-xs" :
            "px-4 py-1.5 text-xs border border-border"
          )}>
          
              <ArrowLeft className="h-3 w-3" />
              <span className="max-w-[120px] truncate">{parentLabel}</span>
            </button>
        }

          {/* Active pill first (when showing siblings) */}
          {currentChildren.filter(c => c.id === activeNodeId).map((child) =>
        <button
          key={child.id}
          data-active="true"
          onClick={() => onChildSelect(child.id)}
          className={cn(
            "shrink-0 rounded-full font-medium transition-all duration-200",
            isMobile ?
            "px-3 py-1.5 text-xs" :
            "px-4 py-1.5 text-xs",
            `${activeColor} text-primary-foreground shadow-sm`
          )}>
              {child.label}
            </button>
        )}

          {/* Other pills */}
          {currentChildren.filter(c => c.id !== activeNodeId).map((child) =>
        <button
          key={child.id}
          data-active={false}
          onClick={() => onChildSelect(child.id)}
          className={cn(
            "shrink-0 rounded-full font-medium border transition-all duration-200",
            isMobile ?
            "px-3 py-1.5 text-xs" :
            "px-4 py-1.5 text-xs",
            "border-border text-muted-foreground hover:border-mnh-teal/50 hover:text-foreground"
          )}>
              {child.label}
            </button>
        )}
        </div>
      }
    </div>);

};

export default DrilldownNav;