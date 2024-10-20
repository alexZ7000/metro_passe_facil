module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./src/app"],
                    alias: {
                        "@assets": "./src/app/ui/assets",
                        "@components": "./src/app/ui/components",
                        "@routes": "./src/app/ui/routes",
                        "@screens": "./src/app/ui/screens",
                        "@utils": "./src/app/utils"
                    }
                }
            ]
        ]
    };
};
