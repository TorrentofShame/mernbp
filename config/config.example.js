
module.exports = {
  db: "mongodb://username:password@localhost:port/db",
  db_dev: "mongodb://localhost:port/db",
  pwa_enabled: true,
  pwa_manifest: {
    name: "MERN Boilerplate PWA",
    short_name: "MERNPWA",
    description: "MERN Boilerplate PWA!",
    theme_color: "#000000",
    background_color: "#FFFFFF",
    icons: [
      {
        src: helpers.root("client/public/assets/images/favicon.ico"),
      sizes: [16, 24, 32, 64]
      },
      {
      src: helpers.root("client/public/assets/images/logo192.png"),
      size: "192x192",
      },
      {
      src: helpers.root("client/public/assets/images/logo512.png"),
      size: "512x512"
      }
    ]
  }
};
