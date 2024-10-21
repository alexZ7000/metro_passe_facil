import { SafeAreaView } from "react-native-safe-area-context";

import Routes from "./src/app/ui/routes/AppRoutes";

import "react-native-gesture-handler";
import { StatusBar } from "react-native";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Routes />
        </SafeAreaView>
    );
}
