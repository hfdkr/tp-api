import { Router } from "express";
const router = Router();

let adherents = [
  { id: 1, nom: "Salma", email: "salma@exemple.ma" },
  { id: 2, nom: "Yassine", email: "yassine@exemple.ma" },
];

//2. adherent
// lister adherents
router.get("/", (req, res) => {
  res.status(200).json(adherents);
});

// Créer un adhérent
router.post("/", (req, res) => {
  const { nom, email } = req.body;
  if (!nom || !email) {
    return res.status(400).json({
      message: "Le nom et l’email sont obligatoires!",
    });
  }
  const newadher = { id: adherents.length + 1, nom, email };
  adherents.push(newadher);
  res.status(201).json(adherents);
});

export default router;