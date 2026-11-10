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

router.get("/", (req, res) => {
  res.status(200).json(livres);
});
// find livres use id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const livre = livres.find((p) => p.id === Number(id));
  if (!livre) {
    return res.status(404).json({
      message: "il n’existe pas",
    });
  }
  res.status(200).json(livre);
});
// creer nouvelle livre
router.post("/", (req, res) => {
  const { titre, auteur } = req.body;

  if (!titre || !auteur) {
    return res.status(400).json({
      message: "Invalid Data !",
    });
  }
  const newProjet = { id: livres.length + 1, titre, auteur, disponible: true };
  livres.push(newProjet);
  res.status(201).json(livres);
});

// Modifier un livre
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  // verifier si le livre existe
  const livre = livres.find((p) => p.id === Number(id));

  if (!livre) {
    return res.status(404).json({
      message: "Ce livre n'existe pas",
    });
  }

  const { titre, auteur } = req.body;

  if (titre !== undefined) {
    livre.titre = titre;
  }

  if (auteur !== undefined) {
    livre.auteur = auteur;
  }

  res.status(200).json(livre);
});

// Supprimer un livre
router.delete("/:id", (req, res) => {

    // Recuperer id
    const { id } = req.params;

    // Chercher le livre
    const livre = livres.find(p => p.id === Number(id));

    //Verifier s'il existe
    if (!livre) {
        return res.status(404).json({
            message: "Livre introuvable"
        });
    }

    // Supprimer le livre
    const index = livres.findIndex(p => p.id === Number(id));

    livres.splice(index, 1);

    //reponse
    res.status(204).send();

});


export default router;