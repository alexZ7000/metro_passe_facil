import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Routes from "./src/app/ui/routes/AppRoutes";

import "react-native-gesture-handler";
import { Platform, StatusBar } from "react-native";
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider
} from "react-native-paper";
import { Camera } from "react-native-vision-camera";

if (Platform.OS !== "web") {
    try {
        require("react-native-gesture-handler");
    } catch (error) {
        console.warn("Erro ao carregar gesture-handler:", error);
    }
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        secondary: "yellow"
    }
};

async function requestCameraPermission() {
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);
}

requestCameraPermission();

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <PaperProvider theme={theme}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Routes />
                </PaperProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
