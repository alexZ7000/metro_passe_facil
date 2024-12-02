import { Platform } from "react-native";

export const isMobile = Platform.OS !== "web";
export const isWeb = Platform.OS === "web";
