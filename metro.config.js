// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config"); // Para projetos Expo
// const { getDefaultConfig } = require('@react-native/metro-config'); // Para projetos React Native puros

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    resolver: {
        ...defaultConfig.resolver,
        // Adicionando aliases de módulos
        alias: {
            "@components": "./src/app/ui/components",
            "@assets": "./src/app/ui/assets"
            // outros aliases que você usa no seu projeto
        },
        // Extensões de arquivos personalizados
        sourceExts: [...defaultConfig.resolver.sourceExts, "svg", "tsx"]
    }
};
