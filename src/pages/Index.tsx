import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import ArticleSection from "@/components/ArticleSection";

import articleJeune from "@/assets/article-jeune.jpg";
import articleImc from "@/assets/article-imc.jpg";
import articleImc2 from "@/assets/article-imc2.jpg";
import articleSomnambulisme from "@/assets/article-somnambulisme.jpg";
import articleInsomnie from "@/assets/article-insomnie.jpg";
import articleHomeopathie from "@/assets/article-homeopathie.jpg";
import articleBurnout from "@/assets/article-burnout.jpg";
import articleGrossesse from "@/assets/article-grossesse.jpg";
import articleAnxiete from "@/assets/article-anxiete.jpg";

const sections = [
  {
    id: "alimentation",
    heading: "Alimentation et Forme",
    articles: [
      {
        image: articleJeune,
        category: "Article",
        tag: "Jeûne intermittent",
        title:
          "Le jeûne : ce qu'il faut comprendre avant d'envisager cette pratique alimentaire",
      },
      {
        image: articleImc,
        category: "Article",
        tag: "false",
        title:
          "Poids et IMC entre 18 et 25 ans : un chiffre fiable ou un repère trompeur ?",
      },
      {
        image: articleImc2,
        category: "Article",
        tag: "IMC et repères",
        title:
          "IMC entre 36 et 45 ans : un indicateur clé en milieu de vie active",
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
        tag: "Mieux connaître les troubles du sommeil",
        title: "Le somnambulisme en détail",
      },
      {
        image: articleInsomnie,
        category: "Article",
        tag: "Insomnie et santé",
        title:
          "Insomnie et troubles digestifs : ce qui faut connaitre",
      },
      {
        image: articleHomeopathie,
        category: "Article",
        tag: "Insomnie et santé",
        title:
          "Homeopathie sommeil : tout ce que vous devez savoir",
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
        tag: "Comment gérer son stress ?",
        title: "Comment lutter contre le burnout parental ?",
      },
      {
        image: articleGrossesse,
        category: "Article",
        tag: "Comment gérer son stress ?",
        title:
          "Stress durant la grossesse : les risques pour le bébé et les solutions pour déstresser",
      },
      {
        image: articleAnxiete,
        category: "Article",
        tag: "Comprendre le stress",
        title: "L'anxiété du Nouvel An : comment le gérer ?",
      },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <button className="flex items-center gap-2 text-sm text-foreground underline hover:text-accent transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" />
          Retour tableau de bord
        </button>

        {/* Sommaire */}
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Sommaire des dossiers
        </h1>

        <TableOfContents />

        {/* Le Mag intro */}
        <div className="mt-14 mb-10">
          <h2 className="text-2xl font-bold text-foreground">Le Mag'</h2>
          <p className="text-muted-foreground mt-1">
            Toute l'actualité et de précieux conseils pour améliorer mon
            bien-être
          </p>
        </div>

        {/* Article sections */}
        <div className="space-y-14">
          {sections.map((section) => (
            <ArticleSection key={section.id} {...section} />
          ))}
        </div>
      </main>

      {/* Footer spacer */}
      <div className="h-16 bg-foreground mt-16" />
    </div>
  );
};

export default Index;
