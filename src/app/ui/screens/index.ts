import type { ComponentType } from "react";
import { Platform } from "react-native";

import FaceComparisonWeb from "./FaceComparisonWeb";
import FaceDetectionWeb from "./FaceDetectionWeb";
import Login from "./Login";
import Signup from "./Signup";
import TextDetection from "./TextDetection";

// Exportações básicas
export { Login, Signup, TextDetection };

// Exportações condicionais
export const FaceDetection: ComponentType<object> = FaceDetectionWeb;
export const FaceComparison: ComponentType<object> = FaceComparisonWeb;

// Sobrescreve com componentes mobile se não estiver na web
if (Platform.OS !== "web") {
    const mobileExports = {
        FaceDetection: require("./FaceDetectionMobile").default,
        FaceComparison: require("./FaceComparisonMobile").default
    };

    Object.assign(exports, mobileExports);
}
