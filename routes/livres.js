import { Router } from "express";
const router = Router();

let livres = [
  {
    id: 1,
    titre: "Le Petit Prince",
    auteur: "Saint-Exupéry",
    disponible: true,
  },
  { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
  { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true },
];
