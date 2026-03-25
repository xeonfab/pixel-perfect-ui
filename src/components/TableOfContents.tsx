import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    id: "alimentation",
    label: "Alimentation et Forme",
    borderColor: "border-l-mnh-navy",
    articles: [
      "Le jeûne intermittent : bienfaits et précautions",
      "Comprendre l'indice de masse corporelle",
      "IMC entre 36 et 45 ans",
    ],
  },
  {
    id: "sommeil",
    label: "Sommeil",
    borderColor: "border-l-mnh-purple",
    articles: [
      "Le somnambulisme en détail",
      "Insomnie et troubles digestifs",
      "Homéopathie et sommeil",
    ],
  },
  {
    id: "stress",
    label: "Stress",
    borderColor: "border-l-mnh-teal",
    articles: [
      "Burnout parental : comment lutter",
      "Stress durant la grossesse",
      "L'anxiété du Nouvel An",
    ],
  },
];

const TableOfContents = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Accordion type="multiple" className="space-y-2">
        {categories.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            className={`border border-border rounded-lg px-4 ${cat.borderColor} border-l-4`}
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(cat.id);
                }}
                className="text-base font-medium text-foreground hover:text-accent transition-colors text-left"
              >
                {cat.label}
              </button>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pb-2">
                {cat.articles.map((article, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollTo(cat.id)}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors text-left"
                    >
                      {article}
                    </button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TableOfContents;
