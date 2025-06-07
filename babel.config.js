module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Asegúrate de que esta línea sea la ÚLTIMA en la lista de plugins.
      "react-native-reanimated/plugin",
    ],
  };
};
