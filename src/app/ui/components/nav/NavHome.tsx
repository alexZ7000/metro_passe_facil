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
                titleStyle={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 30,
                    fontWeight: "bold"
                }}
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
        backgroundColor: "#011689",
        height: "auto"
    },
    metroLogo: {
        width: 30,
        height: 30
    },
    metro: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});
