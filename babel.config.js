module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            "module:metro-react-native-babel-preset",
            "babel-preset-expo"
        ],
        plugins: [
            "react-native-reanimated/plugin",
            // Garantir que o modo 'loose' seja configurado para todos os plugins relacionados
            ["@babel/plugin-transform-class-properties", { loose: true }],
            ["@babel/plugin-transform-private-methods", { loose: true }],
            [
                "@babel/plugin-transform-private-property-in-object",
                { loose: true }
            ],
            [
                "module-resolver",
                {
                    root: ["./src/app"],
                    alias: {
                        "@assets": "./src/app/ui/assets",
                        "@components": "./src/app/ui/components",
                        "@routes": "./src/app/ui/routes",
                        "@screens": "./src/app/ui/screens",
                        "@utils": "./src/app/utils",
                        "@modules": "./src/app/modules",
                        "@shared": "./src/app/shared",
                        "@enums": "./src/app/shared/enums",
                        "@@types": "./src/app/shared/@types",
                        "@functions": "./src/app/shared/functions",
                        "@interfaces": "./src/app/shared/interfaces"
                    }
                }
            ],
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env"
                }
            ]
        ],
        env: {
            production: {
                plugins: ["react-native-paper/babel"]
            }
        }
    };
};
