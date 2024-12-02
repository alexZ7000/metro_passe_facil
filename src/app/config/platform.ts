import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";
export const isMobile = Platform.OS !== "web";

// Configuração de importações condicionais
export const getScreenComponent = (
    webComponent: any,
    mobileComponentPath: string
) => {
    if (isWeb) {
        return webComponent;
    }

    try {
        // Apenas tenta importar o componente mobile se não estiver na web
        return require(mobileComponentPath).default;
    } catch (error) {
        console.warn(
            `Erro ao carregar componente mobile: ${mobileComponentPath}`,
            error
        );
        return webComponent;
    }
};
