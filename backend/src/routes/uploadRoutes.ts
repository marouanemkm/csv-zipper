import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

/**
 * @openapi
 * /upload:
 *   post:
 *     summary: Télécharge un fichier CSV et renvoie un fichier ZIP avec les données séparées par genre.
 *     description: |
 *       Les enregistrements dont le champ `gender` n'est pas `male` ou `female`, ou est manquant, seront ignorés et ne seront pas inclus dans les fichiers CSV générés.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Le fichier CSV à télécharger.
 *     responses:
 *       200:
 *         description: Fichier ZIP contenant les CSV séparés par genre.
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Requête invalide (par exemple, aucun fichier téléchargé ou fichier non valide).
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Aucun fichier n'a été téléchargé."
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/upload", upload.single("file"), uploadFile);

export default router;
