import { Clock } from "lucide-react";

interface MobileArticleCardProps {
  image: string;
  category: string;
  tag: string;
  title: string;
  readingTime?: number;
  isHero?: boolean;
  parentCategory?: string;
}

const MobileArticleCard = ({
  image,
  category,
  tag,
  title,
  readingTime = 5,
  isHero = false,
  parentCategory,
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
        <div className="flex flex-wrap gap-2 items-center mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
            {category}
          </span>
          {parentCategory && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-mnh-teal text-primary-foreground">
              {parentCategory}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-accent">
            {tag}
          </span>
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
