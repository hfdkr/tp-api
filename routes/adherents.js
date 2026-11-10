
import { Router } from "express";

const router = Router();

export let adherents = [
    {
        id: 1,
        nom: "Salma",
        email: "salma@exemple.ma"
    },
    {
        id: 2,
        nom: "Yassine",
        email: "yassine@exemple.ma"
    }
];

// GET : Lister les adhérents
router.get("/", (req, res) => {

    res.status(200).json(adherents);

});

// GET : Chercher un adhérent par ID
router.get("/:id", (req, res) => {

    const { id } = req.params;

    const adherent = adherents.find(
        a => a.id === Number(id)
    );

    if (!adherent) {
        return res.status(404).json({
            message: "Adhérent introuvable"
        });
    }

    res.status(200).json(adherent);

});

// POST : Créer un adhérent
router.post("/", (req, res) => {

    const { nom, email } = req.body;

    if (!nom || !email) {
        return res.status(400).json({
            message: "Le nom et l'email sont obligatoires"
        });
    }

    const newAdherent = {
        id: adherents.length > 0
            ? Math.max(...adherents.map(a => a.id)) + 1
            : 1,
        nom,
        email
    };

    adherents.push(newAdherent);

    res.status(201).json(newAdherent);

});

// DELETE : Supprimer un adhérent
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const index = adherents.findIndex(
        a => a.id === Number(id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Adhérent introuvable"
        });
    }

    adherents.splice(index, 1);

    res.status(204).send();

});

export default router;
