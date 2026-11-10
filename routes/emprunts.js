import { Router } from "express";
const router = Router();

let emprunts = [];

router.get("/", (req, res) => {
    res.status(200).json(emprunts);
})
// 

router.post("/", (req, res) => {

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


export default router;