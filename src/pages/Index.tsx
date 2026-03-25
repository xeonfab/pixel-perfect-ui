import { useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import ArticleSection from "@/components/ArticleSection";
import MobileCategoryNav from "@/components/MobileCategoryNav";
import MobileArticleCard from "@/components/MobileArticleCard";
import ArticleSkeletonCard from "@/components/ArticleSkeletonCard";
import { useIsMobile } from "@/hooks/use-mobile";

import articleJeune from "@/assets/article-jeune.jpg";
import articleImc from "@/assets/article-imc.jpg";
import articleImc2 from "@/assets/article-imc2.jpg";
import articleSomnambulisme from "@/assets/article-somnambulisme.jpg";
import articleInsomnie from "@/assets/article-insomnie.jpg";
import articleHomeopathie from "@/assets/article-homeopathie.jpg";
import articleBurnout from "@/assets/article-burnout.jpg";
import articleGrossesse from "@/assets/article-grossesse.jpg";
import articleAnxiete from "@/assets/article-anxiete.jpg";

const mobileCategories = [
  {
    id: "alimentation",
    label: "Alimentation",
    subcategories: ["Toutes", "Recettes", "Comment maigrir", "Poids et santé"],
  },
  {
    id: "sommeil",
    label: "Sommeil",
    subcategories: ["Toutes", "Troubles du sommeil", "Insomnie", "Remèdes"],
  },
  {
    id: "stress",
    label: "Stress",
    subcategories: ["Toutes", "Gérer son stress", "Comprendre le stress", "Bien-être"],
  },
];

const sections = [
  {
    id: "alimentation",
    heading: "Alimentation et Forme",
    articles: [
      {
        image: articleJeune,
        category: "Article",
        tag: "Jeûne intermittent",
        title: "Le jeûne : ce qu'il faut comprendre avant d'envisager cette pratique alimentaire",
        readingTime: 7,
      },
      {
        image: articleImc,
        category: "Article",
        tag: "Poids et santé",
        title: "Poids et IMC entre 18 et 25 ans : un chiffre fiable ou un repère trompeur ?",
        readingTime: 5,
      },
      {
        image: articleImc2,
        category: "Article",
        tag: "IMC et repères",
        title: "IMC entre 36 et 45 ans : un indicateur clé en milieu de vie active",
        readingTime: 6,
      },
    ],
  },
  {
    id: "sommeil",
    heading: "Sommeil",
    articles: [
      {
        image: articleSomnambulisme,
        category: "Article",
        tag: "Troubles du sommeil",
        title: "Le somnambulisme en détail",
        readingTime: 4,
      },
      {
        image: articleInsomnie,
        category: "Article",
        tag: "Insomnie et santé",
        title: "Insomnie et troubles digestifs : ce qu'il faut connaître",
        readingTime: 6,
      },
      {
        image: articleHomeopathie,
        category: "Article",
        tag: "Insomnie et santé",
        title: "Homéopathie sommeil : tout ce que vous devez savoir",
        readingTime: 5,
      },
    ],
  },
  {
    id: "stress",
    heading: "Stress",
    articles: [
      {
        image: articleBurnout,
        category: "Article",
        tag: "Gérer son stress",
        title: "Comment lutter contre le burnout parental ?",
        readingTime: 8,
      },
      {
        image: articleGrossesse,
        category: "Article",
        tag: "Gérer son stress",
        title: "Stress durant la grossesse : les risques pour le bébé et les solutions pour déstresser",
        readingTime: 7,
      },
      {
        image: articleAnxiete,
        category: "Article",
        tag: "Comprendre le stress",
        title: "L'anxiété du Nouvel An : comment le gérer ?",
        readingTime: 4,
      },
    ],
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("alimentation");
  const [activeSubcategory, setActiveSubcategory] = useState("Toutes");
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (id: string) => {
    if (id === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(id);
    setActiveSubcategory("Toutes");
    // Simulate loading
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleSubcategoryChange = (sub: string) => {
    if (sub === activeSubcategory) return;
    setIsLoading(true);
    setActiveSubcategory(sub);
    setTimeout(() => setIsLoading(false), 400);
  };

  const activeSection = sections.find((s) => s.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile pill navigation */}
      {isMobile && (
        <MobileCategoryNav
          categories={mobileCategories}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
        />
      )}

      <main className={isMobile ? "px-4 py-6" : "max-w-7xl mx-auto px-6 py-8"}>
        {/* Breadcrumb */}
        <button className="flex items-center gap-2 text-sm text-foreground underline hover:text-accent transition-colors mb-6 lg:mb-10">
          <ArrowLeft className="h-4 w-4" />
          Retour tableau de bord
        </button>

        {/* Desktop: full layout */}
        {!isMobile && (
          <>
            <h1 className="text-3xl font-bold text-foreground mb-8">
              Sommaire des dossiers
            </h1>

            <TableOfContents />

            <div className="mt-14 mb-10">
              <h2 className="text-2xl font-bold text-foreground">Le Mag'</h2>
              <p className="text-muted-foreground mt-1">
                Toute l'actualité et de précieux conseils pour améliorer mon bien-être
              </p>
            </div>

            <div className="space-y-14">
              {sections.map((section) => (
                <ArticleSection key={section.id} {...section} />
              ))}
            </div>
          </>
        )}

        {/* Mobile: filtered single-column layout */}
        {isMobile && activeSection && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {activeSection.heading}
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                <ArticleSkeletonCard isHero />
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {activeSection.articles.map((article, i) => (
                  <MobileArticleCard
                    key={`${activeCategory}-${i}`}
                    {...article}
                    isHero={i === 0}
                  />
                ))}
                <button className="w-full py-3 text-sm font-medium text-accent hover:underline transition-colors">
                  Voir plus d'articles
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer spacer */}
      <div className="h-16 bg-foreground mt-16" />
    </div>
  );
};

export default Index;
