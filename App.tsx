import { NativeBaseProvider, StatusBar } from "native-base";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "./src/app/ui/routes/AppRoutes";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NativeBaseProvider>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Routes />
            </NativeBaseProvider>
        </SafeAreaView>
    );
}
