import path from "path";

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@So_on": path.resolve(__dirname, "src/so_on"),
    },
  },
};
