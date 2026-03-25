interface ArticleCardProps {
  image: string;
  category: string;
  tag: string;
  title: string;
}

const ArticleCard = ({ image, category, tag, title }: ArticleCardProps) => {
  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={768}
          height={512}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{category}</span>
          <span className="text-border">|</span>
          <span className="text-accent">{tag}</span>
        </div>
        <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>
      </div>
    </article>
  );
};

export default ArticleCard;
