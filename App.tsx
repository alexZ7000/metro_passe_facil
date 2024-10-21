import { SafeAreaView } from "react-native-safe-area-context";

import Routes from "./src/app/ui/routes/AppRoutes";

import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider
} from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        secondary: "yellow"
    }
};

export default function App() {
    return (
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
    );
}
