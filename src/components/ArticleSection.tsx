import ArticleCard from "./ArticleCard";

interface Article {
  image: string;
  category: string;
  tag: string;
  title: string;
}

interface ArticleSectionProps {
  id: string;
  heading: string;
  articles: Article[];
  parentCategory?: string;
  getParentCategory?: (tag: string) => string;
  parentCategoryColor?: string;
  getParentCategoryColor?: (tag: string) => string;
}

const ArticleSection = ({ id, heading, articles, parentCategory, getParentCategory, parentCategoryColor, getParentCategoryColor }: ArticleSectionProps) => {
  return (
    <section id={id} className="scroll-mt-24">
      {heading && <h2 className="text-2xl font-bold text-foreground mb-6">{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <ArticleCard
            key={i}
            {...article}
            parentCategory={getParentCategory ? getParentCategory(article.tag) : parentCategory}
            parentCategoryColor={getParentCategoryColor ? getParentCategoryColor(article.tag) : parentCategoryColor}
          />
        ))}
      </div>
      <button className="mt-6 text-sm font-medium text-accent hover:underline transition-colors">
        Voir plus d'articles
      </button>
    </section>
  );
};

export default ArticleSection;
