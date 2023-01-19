import "dotenv/config";

export default {
  expo: {
    name: "Gullkorn",
    slug: "Gullkorn",
    ios: {
      bundleIdentifier: "com.hlund.Gullkorn",
    },
    extra: {
      // eas: {
      //   projectId: "7194a937-54a3-4a5b-b062-f8dadffb75d6",
      // },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
