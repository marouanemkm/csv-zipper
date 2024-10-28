import { Response } from "express";
import archiver from "archiver";

interface Person {
  [key: string]: string;
}

export function convertArrayToCSV(data: Person[]): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  return [headers, ...rows].join("\n");
}

export async function processAndSendFiles(res: Response, males: Person[], females: Person[]) {
  const malesCSV = convertArrayToCSV(males);
  const femalesCSV = convertArrayToCSV(females);

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  res.attachment("result.zip");

  archive.on("error", (err: Error) => {
    console.error(err);
    res.status(500).send("Erreur lors de la création du fichier ZIP.");
  });

  archive.pipe(res);

  if (malesCSV) {
    archive.append(malesCSV, { name: "males.csv" });
  }

  if (femalesCSV) {
    archive.append(femalesCSV, { name: "females.csv" });
  }

  await archive.finalize();
}
