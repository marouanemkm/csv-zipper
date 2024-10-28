const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const uploadCSV = async (file: File): Promise<Blob> => {
  try {
    console.log(REACT_APP_BACKEND_URL);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${REACT_APP_BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur ${response.status}: ${errorText}`);
    }

    const blob = await response.blob();
    return blob;
  } catch (error: any) {
    if (error.name === "TypeError") {
      console.error("Erreur de réseau ou le serveur est injoignable:", error);
      throw new Error("Erreur 500: Erreur de connexion au serveur.");
    } else {
      throw error;
    }
  }
};
