import { useState, useCallback, useMemo } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import DrilldownNav from "@/components/DrilldownNav";
import ArticleSection from "@/components/ArticleSection";
import MobileArticleCard from "@/components/MobileArticleCard";
import ArticleSkeletonCard from "@/components/ArticleSkeletonCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  categoryTree,
  findNodePath,
  tagToCategoryMap,
  type CategoryNode,
} from "@/data/categories";

import articleJeune from "@/assets/article-jeune.jpg";
import articleImc from "@/assets/article-imc.jpg";
import articleImc2 from "@/assets/article-imc2.jpg";
import articleSomnambulisme from "@/assets/article-somnambulisme.jpg";
import articleInsomnie from "@/assets/article-insomnie.jpg";
import articleHomeopathie from "@/assets/article-homeopathie.jpg";
import articleBurnout from "@/assets/article-burnout.jpg";
import articleGrossesse from "@/assets/article-grossesse.jpg";
import articleAnxiete from "@/assets/article-anxiete.jpg";

interface Article {
  image: string;
  category: string;
  tag: string;
  title: string;
  readingTime: number;
}

const allArticles: Article[] = [
  { image: articleJeune, category: "Article", tag: "Jeûne intermittent", title: "Le jeûne : ce qu'il faut comprendre avant d'envisager cette pratique alimentaire", readingTime: 7 },
  { image: articleImc, category: "Article", tag: "Poids et santé", title: "Poids et IMC entre 18 et 25 ans : un chiffre fiable ou un repère trompeur ?", readingTime: 5 },
  { image: articleImc2, category: "Article", tag: "IMC et repères", title: "IMC entre 36 et 45 ans : un indicateur clé en milieu de vie active", readingTime: 6 },
  { image: articleSomnambulisme, category: "Article", tag: "Troubles du sommeil", title: "Le somnambulisme en détail", readingTime: 4 },
  { image: articleInsomnie, category: "Article", tag: "Insomnie et santé", title: "Insomnie et troubles digestifs : ce qu'il faut connaître", readingTime: 6 },
  { image: articleHomeopathie, category: "Article", tag: "Insomnie et santé", title: "Homéopathie sommeil : tout ce que vous devez savoir", readingTime: 5 },
  { image: articleBurnout, category: "Article", tag: "Gérer son stress", title: "Comment lutter contre le burnout parental ?", readingTime: 8 },
  { image: articleGrossesse, category: "Article", tag: "Gérer son stress", title: "Stress durant la grossesse : les risques pour le bébé et les solutions pour déstresser", readingTime: 7 },
  { image: articleAnxiete, category: "Article", tag: "Comprendre le stress", title: "L'anxiété du Nouvel An : comment le gérer ?", readingTime: 4 },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [activeRootId, setActiveRootId] = useState("alimentation");
  // null means "show root's children", otherwise an ID deeper in the tree
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = useCallback((ms = 500) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), ms);
  }, []);

  // Compute the current path for breadcrumb
  const currentPath = useMemo(() => {
    if (!activeNodeId) return [categoryTree.find((c) => c.id === activeRootId)!];
    return findNodePath(categoryTree, activeNodeId) || [];
  }, [activeRootId, activeNodeId]);

  // Current node is the last in path
  const currentNode = currentPath[currentPath.length - 1] || null;

  // Children to show in Line 2
  const currentChildren: CategoryNode[] = useMemo(() => {
    if (!currentNode) return [];
    return currentNode.children || [];
  }, [currentNode]);

  // Parent label for back button (show when depth >= 2)
  const parentLabel = useMemo(() => {
    if (currentPath.length <= 1) return null;
    return currentPath[currentPath.length - 2]?.label || null;
  }, [currentPath]);

  // Filter articles based on active node
  const filteredArticles = useMemo(() => {
    const nodeId = activeNodeId || activeRootId;
    return allArticles.filter((a) => {
      const mapped = tagToCategoryMap[a.tag];
      return mapped?.includes(nodeId);
    });
  }, [activeNodeId, activeRootId]);

  // Heading for current section
  const sectionHeading = currentNode?.label || "Articles";

  const handleRootChange = useCallback((id: string) => {
    if (id === activeRootId && !activeNodeId) return;
    setActiveRootId(id);
    setActiveNodeId(null);
    triggerLoading(600);
  }, [activeRootId, activeNodeId, triggerLoading]);

  const handleChildSelect = useCallback((id: string) => {
    if (id === activeNodeId) return;
    // Find the node to see if it has children (drill deeper)
    const path = findNodePath(categoryTree, id);
    if (!path) return;
    const node = path[path.length - 1];
    setActiveNodeId(id);
    // If it has children, we're drilling down; if not, it's a leaf filter
    triggerLoading(400);
  }, [activeNodeId, triggerLoading]);

  const handleBack = useCallback(() => {
    if (currentPath.length <= 1) return;
    // Go up one level: set activeNodeId to grandparent or null
    if (currentPath.length === 2) {
      setActiveNodeId(null);
    } else {
      setActiveNodeId(currentPath[currentPath.length - 2].id);
    }
    triggerLoading(400);
  }, [currentPath, triggerLoading]);

  const handleBreadcrumbClick = useCallback((index: number) => {
    if (index === 0) {
      // Root level
      setActiveRootId(currentPath[0].id);
      setActiveNodeId(null);
    } else {
      setActiveNodeId(currentPath[index].id);
    }
    triggerLoading(400);
  }, [currentPath, triggerLoading]);

  // Breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: "Accueil", clickable: true }, { label: "Dossiers", clickable: true }];
    currentPath.forEach((node) => {
      items.push({ label: node.label, clickable: true });
    });
    return items;
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile drill-down nav */}
      {isMobile && (
        <DrilldownNav
          roots={categoryTree}
          activeRootId={activeRootId}
          activeNodeId={activeNodeId}
          currentChildren={currentChildren}
          parentLabel={parentLabel}
          onRootChange={handleRootChange}
          onChildSelect={handleChildSelect}
          onBack={handleBack}
          isMobile
        />
      )}

      <main className={isMobile ? "px-4 py-6" : "max-w-7xl mx-auto px-6 py-8"}>
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-1 text-sm mb-6 lg:mb-8">
          {breadcrumbItems.map((item, i) => {
            const isLast = i === breadcrumbItems.length - 1;
            const isStatic = i < 2; // Accueil, Dossiers are static
            return (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                {isLast ? (
                  <span className="text-foreground font-medium">{item.label}</span>
                ) : (
                  <button
                    onClick={() => {
                      if (!isStatic) handleBreadcrumbClick(i - 2);
                    }}
                    className="text-muted-foreground hover:text-accent underline-offset-2 hover:underline transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>

        {/* Desktop layout */}
        {!isMobile && (
          <>
            <h1 className="text-3xl font-bold text-foreground mb-8">
              Sommaire des dossiers
            </h1>

            <DrilldownNav
              roots={categoryTree}
              activeRootId={activeRootId}
              activeNodeId={activeNodeId}
              currentChildren={currentChildren}
              parentLabel={parentLabel}
              onRootChange={handleRootChange}
              onChildSelect={handleChildSelect}
              onBack={handleBack}
            />

            <div className="mt-14 mb-10">
              <h2 className="text-2xl font-bold text-foreground">{sectionHeading}</h2>
              <p className="text-muted-foreground mt-1">
                Toute l'actualité et de précieux conseils pour améliorer mon bien-être
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
              </div>
            ) : (
              <div className="animate-fade-in">
                {filteredArticles.length > 0 ? (
                  <ArticleSection
                    id={activeRootId}
                    heading=""
                    articles={filteredArticles}
                  />
                ) : (
                  <p className="text-muted-foreground text-center py-12">
                    Aucun article dans cette catégorie pour le moment.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Mobile layout */}
        {isMobile && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {sectionHeading}
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                <ArticleSkeletonCard isHero />
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, i) => (
                    <MobileArticleCard
                      key={`${article.tag}-${i}`}
                      {...article}
                      isHero={i === 0}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-12">
                    Aucun article dans cette catégorie pour le moment.
                  </p>
                )}
                {filteredArticles.length > 0 && (
                  <button className="w-full py-3 text-sm font-medium text-accent hover:underline transition-colors">
                    Voir plus d'articles
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <div className="h-16 bg-foreground mt-16" />
    </div>
  );
};

export default Index;
