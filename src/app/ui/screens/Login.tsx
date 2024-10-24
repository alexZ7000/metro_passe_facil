import metroLogo from "@assets/metro-logo.png";
import NavHome from "@components/Home/NavHome";
import { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    Platform,
    View,
    StyleSheet,
    KeyboardAvoidingView
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

export default function Login() {
    const [emailInputText, setEmailInputText] = useState("");
    const [passwordInputText, setPasswordInputText] = useState("");
    const screenHeight = Dimensions.get("window").height;
    const isWeb = Platform.OS === "web";

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <NavHome />
            <View style={styles.innerContainer}>
                <ImageBackground source={metroLogo} style={styles.logo} />
                <TextInput
                    mode="outlined"
                    label="E-mail"
                    value={emailInputText}
                    placeholder="Insira seu e-mail"
                    onChangeText={setEmailInputText}
                    style={styles.input}
                    theme={{ colors: { primary: "#011689" } }}
                />
                <TextInput
                    mode="outlined"
                    label="Senha"
                    value={passwordInputText}
                    placeholder="Insira sua senha"
                    onChangeText={setPasswordInputText}
                    style={styles.input}
                    theme={{ colors: { primary: "#011689" } }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        style={[styles.button, { width: "100%" }]}
                        buttonColor="#011689"
                        icon="login"
                        mode="contained"
                        onPress={() => console.log("pressionado")}
                    >
                        Entrar
                    </Button>
                </View>
                <Text style={styles.footerText} variant="bodySmall">
                    Feito por Instituto Mauá de Tecnologia
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF0F4"
    },
    innerContainer: {
        height: Dimensions.get("window").height,
        margin: "auto",
        marginLeft: 30,
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginBottom: 20,
        shadowColor: "#C7C8CC",
        shadowOffset: { width: 11.41, height: 11.41 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5
    },
    buttonContainer: {
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%"
    },
    input: {
        backgroundColor: "#e0e0e0",
        borderRadius: 35,
        shadowColor: "#C7C8CC",
        shadowOffset: { width: 11.41, height: 11.41 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 15,
        width: "100%"
    },
    button: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#4a90e2",
        borderRadius: 35,
        shadowColor: "#C7C8CC",
        shadowOffset: { width: 11.41, height: 11.41 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5
    },
    footerText: {
        position: "absolute",
        bottom: Dimensions.get("window").height * (15 / 100),
        color: "#555"
    }
});
