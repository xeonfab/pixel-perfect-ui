import { Clock } from "lucide-react";

interface MobileArticleCardProps {
  image: string;
  category: string;
  tag: string;
  title: string;
  readingTime?: number;
  isHero?: boolean;
}

const MobileArticleCard = ({
  image,
  category,
  tag,
  title,
  readingTime = 5,
  isHero = false,
}: MobileArticleCardProps) => {
  return (
    <article
      className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 cursor-pointer transition-all duration-300 active:scale-[0.98] hover:shadow-lg"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={768}
          height={isHero ? 400 : 512}
          className={cn(
            "w-full object-cover transition-transform duration-300 group-hover:scale-105",
            isHero ? "h-56" : "h-44 aspect-video"
          )}
        />
      </div>
      <div className={isHero ? "p-5" : "p-4"}>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-mnh-teal mb-2">
          <span>{category}</span>
          <span className="text-muted-foreground">•</span>
          <span>{tag}</span>
        </div>
        <h3
          className={cn(
            "font-bold text-foreground leading-snug line-clamp-3 group-hover:text-accent transition-colors",
            isHero ? "text-lg" : "text-sm"
          )}
        >
          {title}
        </h3>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{readingTime} min de lecture</span>
        </div>
      </div>
    </article>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default MobileArticleCard;
