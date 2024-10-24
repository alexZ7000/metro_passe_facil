import metroLogo from "@assets/metro-logo.png";
import metro from "@assets/metro.png";
import { StyleSheet, Image, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function NavHome() {
    return (
        <Appbar.Header style={styles.header} mode="center-aligned">
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
    header: {
        backgroundColor: "#011689"
    },
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