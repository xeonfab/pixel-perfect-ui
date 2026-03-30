import { useState, useCallback, useMemo } from "react";
import { ArrowLeft, Search } from "lucide-react";
import Header from "@/components/Header";
import DrilldownNav from "@/components/DrilldownNav";
import ArticleSection from "@/components/ArticleSection";
import MobileArticleCard from "@/components/MobileArticleCard";
import ArticleSkeletonCard from "@/components/ArticleSkeletonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const ARTICLES_PER_PAGE = 9;

const Index = () => {
  const isMobile = useIsMobile();
  const [activeRootId, setActiveRootId] = useState("toutes");
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const isSearchActive = searchQuery.trim().length > 0;

  const triggerLoading = useCallback((ms = 500) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), ms);
  }, []);

  const currentPath = useMemo(() => {
    if (!activeNodeId) return [categoryTree.find((c) => c.id === activeRootId)!];
    return findNodePath(categoryTree, activeNodeId) || [];
  }, [activeRootId, activeNodeId]);

  const currentNode = currentPath[currentPath.length - 1] || null;

  const currentChildren: CategoryNode[] = useMemo(() => {
    if (!currentNode) return [];
    if (currentNode.children && currentNode.children.length > 0) {
      return currentNode.children;
    }
    if (currentPath.length >= 2) {
      const parent = currentPath[currentPath.length - 2];
      return parent.children || [];
    }
    return [];
  }, [currentNode, currentPath]);

  const parentLabel = useMemo(() => {
    if (currentPath.length <= 1) return null;
    return currentPath[currentPath.length - 2]?.label || null;
  }, [currentPath]);

  const activeRootLabel = useMemo(() => {
    if (activeRootId === "toutes") return "";
    return categoryTree.find((c) => c.id === activeRootId)?.label || "";
  }, [activeRootId]);

  const activeRootColor = categoryTree.find((c) => c.id === activeRootId)?.color || "bg-mnh-teal";

  // Filter articles based on active node + search query
  const filteredArticles = useMemo(() => {
    let results = allArticles;

    // Category filter
    if (!(activeRootId === "toutes" && !activeNodeId)) {
      const nodeId = activeNodeId || activeRootId;
      results = results.filter((a) => {
        const mapped = tagToCategoryMap[a.tag];
        return mapped?.includes(nodeId);
      });
    }

    // Search filter
    if (isSearchActive) {
      const q = searchQuery.trim().toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.tag.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return results;
  }, [activeNodeId, activeRootId, searchQuery, isSearchActive]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = filteredArticles.length > visibleCount;

  const getArticleParentCategory = useCallback((tag: string) => {
    if (activeRootId !== "toutes") return activeRootLabel;
    const mapped = tagToCategoryMap[tag];
    if (!mapped || mapped.length === 0) return "";
    const rootId = mapped[0];
    return categoryTree.find((c) => c.id === rootId)?.label || "";
  }, [activeRootId, activeRootLabel]);

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
    setVisibleCount(ARTICLES_PER_PAGE);
    triggerLoading(600);
  }, [activeRootId, activeNodeId, triggerLoading]);

  const handleChildSelect = useCallback((id: string) => {
    if (id === activeNodeId) return;
    const path = findNodePath(categoryTree, id);
    if (!path) return;
    setActiveNodeId(id);
    setVisibleCount(ARTICLES_PER_PAGE);
    triggerLoading(400);
  }, [activeNodeId, triggerLoading]);

  const handleBack = useCallback(() => {
    if (currentPath.length <= 1) return;
    if (currentPath.length === 2) {
      setActiveNodeId(null);
    } else {
      setActiveNodeId(currentPath[currentPath.length - 2].id);
    }
    setVisibleCount(ARTICLES_PER_PAGE);
    triggerLoading(400);
  }, [currentPath, triggerLoading]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const SearchBar = () => (
    <div className={`relative ${isMobile ? "w-full" : "w-72 ml-auto"}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher un article..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-9 h-9 text-sm rounded-full bg-secondary border-border"
      />
    </div>
  );

  const SearchSummary = () => {
    if (!isSearchActive) return null;
    return (
      <p className="text-sm text-muted-foreground mb-4">
        <span className="font-semibold text-foreground">{filteredArticles.length}</span> résultat{filteredArticles.length !== 1 ? "s" : ""} pour la recherche : <span className="font-medium text-foreground">« {searchQuery.trim()} »</span>
      </p>
    );
  };

  const LoadMoreButton = () => {
    if (!hasMore) return null;
    return (
      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          onClick={handleLoadMore}
          className="rounded-full px-8"
        >
          Charger plus d'articles
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile drill-down nav */}
      {isMobile && (
        <DrilldownNav
          roots={categoryTree}
          activeRootId={activeRootId}
          activeNodeId={activeNodeId}
          currentChildren={isSearchActive ? [] : currentChildren}
          parentLabel={isSearchActive ? null : parentLabel}
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
              currentChildren={isSearchActive ? [] : currentChildren}
              parentLabel={isSearchActive ? null : parentLabel}
              activeColor={activeRootColor}
              onRootChange={handleRootChange}
              onChildSelect={handleChildSelect}
              onBack={handleBack}
            />

            <div className="mt-6 flex items-center justify-between gap-4">
              <SearchSummary />
              <SearchBar />
            </div>

            <div className="mt-6" />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
              </div>
            ) : (
              <div className="animate-fade-in">
                {visibleArticles.length > 0 ? (
                  <>
                    <ArticleSection
                      id={activeRootId}
                      heading=""
                      articles={visibleArticles}
                      parentCategory={activeRootLabel}
                      parentCategoryColor={activeRootColor}
                      getParentCategory={activeRootId === "toutes" ? getArticleParentCategory : undefined}
                      getParentCategoryColor={activeRootId === "toutes" ? getArticleParentCategoryColor : undefined}
                    />
                    <LoadMoreButton />
                  </>
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
            <SearchBar />
            <SearchSummary />

            {isLoading ? (
              <div className="space-y-4">
                <ArticleSkeletonCard isHero />
                <ArticleSkeletonCard />
                <ArticleSkeletonCard />
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {visibleArticles.length > 0 ? (
                  <>
                    {visibleArticles.map((article, i) => (
                      <MobileArticleCard
                        key={`${article.tag}-${i}`}
                        {...article}
                        isHero={i === 0}
                        parentCategory={getArticleParentCategory(article.tag)}
                        parentCategoryColor={getArticleParentCategoryColor(article.tag)}
                      />
                    ))}
                    <LoadMoreButton />
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-12">
                    Aucun article dans cette catégorie pour le moment.
                  </p>
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
