import fundo from "@assets/fundo_padrao_azul.png";
import linhas from "@assets/linhas_metro_correcao.png";
import metroLogo from "@assets/metro-logo.png";
import NavHome from "@components/nav/NavHome";
import loginOrRegisterUser from "@modules/Auth/authService";
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

    async function handleLogin() {
        try {
            const user = await loginOrRegisterUser(
                emailInputText,
                passwordInputText
            );
            if (user.isNewUser) {
                alert("Conta criada com sucesso! Bem-vindo(a)!");
            } else {
                alert("Login realizado com sucesso!");
            }
        } catch (error: any) {
            alert("Erro ao fazer login: " + error.message);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* <NavHome /> */}
            <ImageBackground source={fundo} style={styles.background}>
                {/* <View style={styles.overlay}> */}
                {/* <NavHome /> */}
                <View style={styles.innerContainer}>
                    <ImageBackground
                        source={linhas}
                        style={styles.innerBackground}
                        imageStyle={{ opacity: 0.5 }}
                    >
                        <View style={styles.nav}>
                            <NavHome />
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.title}>Usuário</Text>
                            <TextInput
                                mode="outlined"
                                label="Registro"
                                value={emailInputText}
                                placeholder="Insira seu registro"
                                onChangeText={setEmailInputText}
                                style={styles.input}
                                theme={{ colors: { primary: "#011689" } }}
                                outlineStyle={{ borderRadius: 15 }}
                            />
                            <Text style={styles.title}>Senha</Text>
                            <TextInput
                                mode="outlined"
                                label="Senha"
                                secureTextEntry
                                value={passwordInputText}
                                placeholder="Insira sua senha"
                                onChangeText={setPasswordInputText}
                                style={styles.input}
                                theme={{ colors: { primary: "#011689" } }}
                                outlineStyle={{ borderRadius: 15 }}
                            />

                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    buttonColor="#011689"
                                    icon="login"
                                    mode="contained"
                                    onPress={handleLogin}
                                >
                                    Entrar
                                </Button>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={styles.footerText} variant="bodySmall">
                    Feito por Instituto Mauá de Tecnologia
                </Text>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    innerBackground: {
        width: "100%",
        height: "100%"
    },
    inputView: {
        justifyContent: "center",
        paddingLeft: "10%"
    },

    nav: {
        paddingVertical: "5%",
        paddingLeft: "10%",
        justifyContent: "flex-end"
    },

    innerContainer: {
        // Container da imagem de fundo
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 18,
        fontWeight: "bold"
    },
    input: {
        marginBottom: "1%",
        width: "60%",
        shadowColor: "#000"
    },
    buttonContainer: {
        width: "100%"
    },
    button: {
        backgroundColor: "#011689",
        borderRadius: 15,
        width: "20%"
    },
    footerText: {
        position: "absolute",
        bottom: Dimensions.get("window").height * (15 / 100),
        color: "#555"
    }
});
