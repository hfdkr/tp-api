import express from "express";
const app = express();

app.use(express.json());

import livreRoutes from "./routes/livres.js";
import adherentRoutes from "./routes/adherents.js";
import empruntRoutes from "./routes/emprunts.js";
app.use("/livres", livreRoutes);
app.use("/adherents", adherentRoutes);
app.use("/emprunts", empruntRoutes);

// port
app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));
