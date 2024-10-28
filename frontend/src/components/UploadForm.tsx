import React, { useState } from "react";
import { uploadCSV } from "@/services/upload.service";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      if (selectedFile.type !== "text/csv" && selectedFile.type !== "application/vnd.ms-excel") {
        setMessage("Veuillez sélectionner un fichier CSV valide.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setMessage("Veuillez sélectionner un fichier CSV.");
      return;
    }

    try {
      const blob = await uploadCSV(file);
      setMessage("Le fichier a été traité avec succès. Le téléchargement va commencer.");

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "result.zip");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("500")) {
        setMessage("Erreur du serveur : Veuillez réessayer plus tard.");
      } else {
        setMessage(`Erreur : ${error.message}`);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Télécharger un fichier CSV</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!file ? (
            <div className="flex items-center justify-center">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V8m0 0l-4 4m4-4l4 4M17 8v8m0 0l-4-4m4 4l4-4" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">CSV uniquement</p>
                </div>
                <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2 text-gray-700">{file.name}</span>
              </div>
              <button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!file}
          >
            Envoyer
          </button>
        </form>
        {message && (
          <div className={`mt-4 text-center ${message.startsWith("Erreur") || message.startsWith("Veuillez") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
