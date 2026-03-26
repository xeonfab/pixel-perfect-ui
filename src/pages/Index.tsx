import { useState, useCallback, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
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
  categoryColorMap,
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
  { image: articleJeune, category: "Article", tag: "Jeûne intermittent", title: "Jeûne de 16h : bienfaits, risques et conseils pour débuter sereinement", readingTime: 6 },
  { image: articleImc, category: "Article", tag: "Poids et santé", title: "Comprendre la relation entre alimentation émotionnelle et prise de poids", readingTime: 5 },
  { image: articleImc2, category: "Article", tag: "IMC et repères", title: "IMC après 50 ans : pourquoi les repères changent avec l'âge", readingTime: 7 },
  { image: articleSomnambulisme, category: "Article", tag: "Troubles du sommeil", title: "Terreurs nocturnes chez l'adulte : causes et solutions", readingTime: 5 },
  { image: articleInsomnie, category: "Article", tag: "Insomnie et santé", title: "Écrans et insomnie : comment la lumière bleue perturbe votre sommeil", readingTime: 6 },
  { image: articleHomeopathie, category: "Article", tag: "Troubles du sommeil", title: "Apnée du sommeil : signes d'alerte et traitements efficaces", readingTime: 8 },
  { image: articleBurnout, category: "Article", tag: "Gérer son stress", title: "5 techniques de respiration pour calmer une crise d'angoisse", readingTime: 4 },
  { image: articleGrossesse, category: "Article", tag: "Comprendre le stress", title: "Le stress chronique : comprendre ses effets sur le corps et l'esprit", readingTime: 9 },
  { image: articleAnxiete, category: "Article", tag: "Comprendre le stress", title: "Stress au travail : identifier les signaux avant le burn-out", readingTime: 6 },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [activeRootId, setActiveRootId] = useState("toutes");
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
  // If active node is a leaf (no children), show its siblings (parent's children)
  const currentChildren: CategoryNode[] = useMemo(() => {
    if (!currentNode) return [];
    if (currentNode.children && currentNode.children.length > 0) {
      return currentNode.children;
    }
    // Leaf node: show siblings from parent
    if (currentPath.length >= 2) {
      const parent = currentPath[currentPath.length - 2];
      return parent.children || [];
    }
    return [];
  }, [currentNode, currentPath]);

  // Parent label for back button (show when depth >= 2)
  const parentLabel = useMemo(() => {
    if (currentPath.length <= 1) return null;
    return currentPath[currentPath.length - 2]?.label || null;
  }, [currentPath]);

  // Get root category label — for "toutes", derive from article tag
  const activeRootLabel = useMemo(() => {
    if (activeRootId === "toutes") return "";
    return categoryTree.find((c) => c.id === activeRootId)?.label || "";
  }, [activeRootId]);

  const activeRootColor = categoryTree.find((c) => c.id === activeRootId)?.color || "bg-mnh-teal";
  // Filter articles based on active node
  const filteredArticles = useMemo(() => {
    if (activeRootId === "toutes" && !activeNodeId) return allArticles;
    const nodeId = activeNodeId || activeRootId;
    return allArticles.filter((a) => {
      const mapped = tagToCategoryMap[a.tag];
      return mapped?.includes(nodeId);
    });
  }, [activeNodeId, activeRootId]);

  // Helper: get parent category label for an article tag
  const getArticleParentCategory = useCallback((tag: string) => {
    if (activeRootId !== "toutes") return activeRootLabel;
    const mapped = tagToCategoryMap[tag];
    if (!mapped || mapped.length === 0) return "";
    const rootId = mapped[0];
    return categoryTree.find((c) => c.id === rootId)?.label || "";
  }, [activeRootId, activeRootLabel]);

  // Helper: get parent category color for an article tag
  const getArticleParentCategoryColor = useCallback((tag: string) => {
    if (activeRootId !== "toutes") return activeRootColor;
    const mapped = tagToCategoryMap[tag];
    if (!mapped || mapped.length === 0) return "bg-mnh-teal";
    const rootId = mapped[0];
    return categoryTree.find((c) => c.id === rootId)?.color || "bg-mnh-teal";
  }, [activeRootId, activeRootColor]);

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
          activeColor={activeRootColor}
          onRootChange={handleRootChange}
          onChildSelect={handleChildSelect}
          onBack={handleBack}
          isMobile
        />
      )}

      <main className={isMobile ? "px-4 py-6" : "max-w-7xl mx-auto px-6 py-8"}>

        {/* Desktop layout */}
        {!isMobile && (
          <>


            <DrilldownNav
              roots={categoryTree}
              activeRootId={activeRootId}
              activeNodeId={activeNodeId}
              currentChildren={currentChildren}
              parentLabel={parentLabel}
              activeColor={activeRootColor}
              onRootChange={handleRootChange}
              onChildSelect={handleChildSelect}
              onBack={handleBack}
            />

            <div className="mt-10" />

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
                    parentCategory={activeRootLabel}
                    getParentCategory={activeRootId === "toutes" ? getArticleParentCategory : undefined}
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
            <h2 className="sr-only">Articles</h2>

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
                      parentCategory={getArticleParentCategory(article.tag)}
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
