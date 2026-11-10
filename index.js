import express from "express";
const app = express();
app.use(express.json());
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
let adherents = [
  { id: 1, nom: "Salma", email: "salma@exemple.ma" },
  { id: 2, nom: "Yassine", email: "yassine@exemple.ma" },
];
let emprunts = [];
// get livres
app.get("/livres", (req, res) => res.json(livres));

// find livres use id
app.get("/livres/:id", (req, res) => {
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
app.post("/livres", (req, res) => {
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
app.patch("/livres/:id", (req, res) => {
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
app.delete("/livres/:id", (req, res) => {

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

//2. adherent
// lister adherents
app.get("/adherents", (req, res) => {
  res.status(200).json(adherents);
});

// Créer un adhérent
app.post("/adherents", (req, res) => {
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

// 3.emprunts
// lister emprunts
app.get("/emprunts",(req,res)=>{
    res.status(200).json(emprunts);
})
// 

app.post("/emprunts", (req, res) => {

    const { livreId, adherentId } = req.body;

    //  Chercher le livre
    const livre = livres.find(
        p => p.id === Number(livreId)
    );

    if (!livre) {
        return res.status(404).json({
            message: "Livre introuvable"
        });
    }

    //  Chercher l'adhérent
    const adherent = adherents.find(
        a => a.id === Number(adherentId)
    );

    if (!adherent) {
        return res.status(404).json({
            message: "Adhérent introuvable"
        });
    }


    if (!livre.disponible) {
        return res.status(400).json({
            message: "Ce livre n'est pas disponible"
        });
    }

    // Modifier la disponibilité
    livre.disponible = false;

    // reponse
    res.status(201).json(livre,adherent);
});

// port
app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));
