module.exports = ({ config }) => ({
    ...config,
    extra: {
      apiUrl: process.env.API_URL || "https://rh.minesec.gov.cm/api",
      baseUrl: process.env.BASE_URL || "https://rh.minesec.gov.cm",
      eas: {
        projectId: "6fe576be-ffdb-4781-96c0-23dc9f522e17",
      },
    },
    plugins: [
        "expo-localization"
      ]
  });