import { Platform } from "react-native";

export const isCameraAvailable = Platform.OS !== "web";

export const initializeCamera = () => {
    if (!isCameraAvailable) {
        return null;
    }

    try {
        return require("react-native-vision-camera");
    } catch (error) {
        console.warn("Camera não disponível:", error);
        return null;
    }
};
