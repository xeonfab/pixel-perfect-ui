import { Skeleton } from "@/components/ui/skeleton";

interface ArticleSkeletonCardProps {
  isHero?: boolean;
}

const ArticleSkeletonCard = ({ isHero = false }: ArticleSkeletonCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
      <Skeleton className={isHero ? "w-full h-56" : "w-full h-44"} />
      <div className={isHero ? "p-5 space-y-3" : "p-4 space-y-3"}>
        <Skeleton className="h-3 w-32" />
        <Skeleton className={isHero ? "h-6 w-full" : "h-4 w-full"} />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};

export default ArticleSkeletonCard;
