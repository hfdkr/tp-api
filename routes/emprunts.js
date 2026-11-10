
import { Router } from "express";

import { livres } from "./livres.js";
import { adherents } from "./adherents.js";

const router = Router();

let emprunts = [];

// GET : Lister tous les emprunts
router.get("/", (req, res) => {

    res.status(200).json(emprunts);

});

// POST : Créer un emprunt
router.post("/", (req, res) => {

    const { livreId, adherentId } = req.body;

    // Vérifier les données
    if (livreId === undefined || adherentId === undefined) {
        return res.status(400).json({
            message: "livreId et adherentId sont obligatoires"
        });
    }

    // Chercher le livre
    const livre = livres.find(
        p => p.id === Number(livreId)
    );

    if (!livre) {
        return res.status(404).json({
            message: "Livre introuvable"
        });
    }

    // Chercher l'adhérent
    const adherent = adherents.find(
        a => a.id === Number(adherentId)
    );

    if (!adherent) {
        return res.status(404).json({
            message: "Adhérent introuvable"
        });
    }

    // Vérifier la disponibilité
    if (!livre.disponible) {
        return res.status(400).json({
            message: "Ce livre n'est pas disponible"
        });
    }

    // Modifier la disponibilité
    livre.disponible = false;

    // Créer un nouvel emprunt
    const newEmprunt = {
        id: emprunts.length > 0
            ? Math.max(...emprunts.map(e => e.id)) + 1
            : 1,
        livreId: livre.id,
        adherentId: adherent.id
    };

    emprunts.push(newEmprunt);

    // Réponse
    res.status(201).json({
        message: "Emprunt créé avec succès",
        emprunt: newEmprunt,
        livre: livre,
        adherent: adherent
    });

});


export {emprunts};
export default router;
