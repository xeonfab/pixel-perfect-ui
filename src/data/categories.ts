import { Apple, Moon, SmilePlus, LayoutGrid } from "lucide-react";
import { createElement } from "react";

export interface CategoryNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: CategoryNode[];
}

export const categoryTree: CategoryNode[] = [
  {
    id: "toutes",
    label: "Toutes",
    icon: createElement(LayoutGrid, { className: "h-4 w-4" }),
  },
  {
    id: "alimentation",
    label: "Alimentation et Forme",
    icon: createElement(Apple, { className: "h-4 w-4" }),
    children: [
      { id: "ali-toutes", label: "Toutes" },
      {
        id: "ali-recettes",
        label: "Recettes",
        children: [
          { id: "ali-rec-toutes", label: "Toutes" },
          { id: "ali-rec-legeres", label: "Recettes légères" },
          { id: "ali-rec-equilibrees", label: "Repas équilibrés" },
          { id: "ali-rec-desserts", label: "Desserts sains" },
        ],
      },
      {
        id: "ali-maigrir",
        label: "Comment maigrir",
        children: [
          { id: "ali-mai-toutes", label: "Toutes" },
          {
            id: "ali-mai-regimes",
            label: "Régimes",
            children: [
              { id: "ali-mai-reg-toutes", label: "Toutes" },
              { id: "ali-mai-reg-cetogene", label: "Régime cétogène" },
              { id: "ali-mai-reg-mediterraneen", label: "Régime méditerranéen" },
              { id: "ali-mai-reg-jeune", label: "Jeûne intermittent" },
            ],
          },
          { id: "ali-mai-exercice", label: "Exercice physique" },
          { id: "ali-mai-conseils", label: "Conseils nutrition" },
        ],
      },
      { id: "ali-poids", label: "Poids et santé" },
    ],
  },
  {
    id: "sommeil",
    label: "Le Sommeil",
    icon: createElement(Moon, { className: "h-4 w-4" }),
    children: [
      { id: "som-toutes", label: "Toutes" },
      {
        id: "som-troubles",
        label: "Troubles du sommeil",
        children: [
          { id: "som-tro-toutes", label: "Toutes" },
          { id: "som-tro-apnee", label: "Apnée du sommeil" },
          { id: "som-tro-somnambulisme", label: "Somnambulisme" },
          { id: "som-tro-narcolepsie", label: "Narcolepsie" },
        ],
      },
      { id: "som-insomnie", label: "Insomnie" },
      { id: "som-remedes", label: "Remèdes" },
    ],
  },
  {
    id: "stress",
    label: "Gestion du Stress",
    icon: createElement(SmilePlus, { className: "h-4 w-4" }),
    children: [
      { id: "str-toutes", label: "Toutes" },
      {
        id: "str-gerer",
        label: "Gérer son stress",
        children: [
          { id: "str-ger-toutes", label: "Toutes" },
          { id: "str-ger-meditation", label: "Méditation" },
          { id: "str-ger-respiration", label: "Respiration" },
          { id: "str-ger-sport", label: "Sport anti-stress" },
        ],
      },
      { id: "str-comprendre", label: "Comprendre le stress" },
      { id: "str-bienetre", label: "Bien-être" },
    ],
  },
];

// Utility: find a node and its path in the tree
export function findNodePath(
  tree: CategoryNode[],
  targetId: string,
  path: CategoryNode[] = []
): CategoryNode[] | null {
  for (const node of tree) {
    const currentPath = [...path, node];
    if (node.id === targetId) return currentPath;
    if (node.children) {
      const found = findNodePath(node.children, targetId, currentPath);
      if (found) return found;
    }
  }
  return null;
}

// Get all descendant leaf IDs (for article filtering)
export function getAllDescendantIds(node: CategoryNode): string[] {
  if (!node.children) return [node.id];
  return [node.id, ...node.children.flatMap(getAllDescendantIds)];
}

// Map article tags to category node IDs for filtering
export const tagToCategoryMap: Record<string, string[]> = {
  "Jeûne intermittent": ["alimentation", "ali-toutes", "ali-maigrir", "ali-mai-regimes", "ali-mai-reg-jeune"],
  "Poids et santé": ["alimentation", "ali-toutes", "ali-poids"],
  "IMC et repères": ["alimentation", "ali-toutes", "ali-poids"],
  "Troubles du sommeil": ["sommeil", "som-toutes", "som-troubles", "som-tro-toutes", "som-tro-somnambulisme"],
  "Insomnie et santé": ["sommeil", "som-toutes", "som-insomnie"],
  "Gérer son stress": ["stress", "str-toutes", "str-gerer", "str-ger-toutes"],
  "Comprendre le stress": ["stress", "str-toutes", "str-comprendre"],
};
