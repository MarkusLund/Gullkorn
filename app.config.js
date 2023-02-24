import "dotenv/config";

export default {
  expo: {
    name: "Gullkorn",
    slug: "Gullkorn",
    ios: {
      bundleIdentifier: "com.hlund.Gullkorn",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
