import { Request, Response } from "express";
import stream from "stream";
import csvParser from "csv-parser";
import { processAndSendFiles } from "../services/csvService";

interface Person {
  [key: string]: string;
}

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).send("Aucun fichier n'a été téléchargé.");
      return;
    }

    const allowedMimeTypes = ["text/csv", "application/vnd.ms-excel"];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).send("Le fichier téléchargé n'est pas un fichier CSV valide.");
      return;
    }

    const males: Person[] = [];
    const females: Person[] = [];
    const unrecognizedRows: Person[] = [];

    const readableFile = new stream.PassThrough();
    readableFile.end(req.file.buffer);

    readableFile
      .pipe(csvParser())
      .on("data", (row: Person) => {
        const gender = row.gender?.toLowerCase();
        if (gender === "male") {
          males.push(row);
        } else if (gender === "female") {
          females.push(row);
        } else {
          unrecognizedRows.push(row);
        }
      })
      .on("end", async () => {
        if (unrecognizedRows.length > 0) {
          console.warn("Lignes avec un genre non reconnu ou manquant :");
          unrecognizedRows.forEach((row, index) => {
            console.warn(`Ligne ${index + 1}:`, row);
          });
        }
        await processAndSendFiles(res, males, females);
      })
      .on("error", (err: Error) => {
        console.error(err);
        res.status(500).send("Erreur lors de la lecture du fichier CSV.");
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur est survenue lors du traitement du fichier.");
  }
};
