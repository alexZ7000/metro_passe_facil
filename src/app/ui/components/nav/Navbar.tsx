import metroLogo from "@assets/metro-logo.png";
import metro from "@assets/metro.png";
import { useNavigationState } from "@react-navigation/native";
import { StyleSheet, Image, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function Navbar({ activeRoute }: { activeRoute: string }) {
    const routeName = useNavigationState((state) => {
        let route = state.routes[state.index];
        while (route.state && route.state.index !== undefined) {
            route = route.state.routes[route.state.index] as any;
        }
        return route.name;
    });

    const screenColors: Record<string, string> = {
        LiveMonitoring: "#179330",
        VideoCall: "#f7b731",
        Signup: "#9164cc"
    };

    const backgroundColor = screenColors[activeRoute] || "#179330";
    return (
        <Appbar.Header style={{ backgroundColor }} mode="center-aligned">
            <Appbar.Action
                icon={() => (
                    <Image source={metroLogo} style={styles.metroLogo} />
                )}
            />

            <Appbar.Content
                mode="center-aligned"
                titleStyle={{ textAlign: "center", color: "white" }}
                title="Passe Fácil"
            />

            <View style={styles.imageContainer}>
                <Image source={metro} style={styles.metro} />
            </View>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    metroLogo: {
        width: 24,
        height: 24
    },
    metro: {
        width: 32,
        height: 32,
        resizeMode: "contain"
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});
