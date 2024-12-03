import fundo from "@assets/fundo_padrao_azul.png";
import linhas from "@assets/linhas_metro_correcao.png";
import metroLogo from "@assets/metro-logo.png";
import Header from "@components/nav/Header";
import loginOrRegisterUser from "@modules/Auth/authService";
import { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    Platform,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    Image,
    ScrollView
} from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";

export default function Login() {
    const [emailInputText, setEmailInputText] = useState("");
    const [passwordInputText, setPasswordInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateFields() {
        if (!emailInputText) {
            Alert.alert("Erro", "E-mail não pode ser vazio");
            return false;
        }
        if (!passwordInputText) {
            Alert.alert("Erro", "Senha não pode ser vazia");
            return false;
        }
        return true;
    }

    async function handleLogin() {
        if (!validateFields()) return;
        setIsLoading(true);
        try {
            const user = await loginOrRegisterUser(
                emailInputText,
                passwordInputText
            );
            if (user.isNewUser)
                Alert.alert(
                    "Sucesso",
                    "Conta criada com sucesso! Bem-vindo(a)!"
                );
        } catch (error: any) {
            Alert.alert("Erro", "Erro ao fazer login: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ImageBackground source={fundo} style={styles.background}>
                <Header
                    title="Passe Fácil"
                    icon="log-in"
                    backgroundColor="#011689"
                    textColor="white"
                />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.contentContainer}>
                        <View style={styles.innerContainer}>
                            <ImageBackground
                                source={linhas}
                                style={styles.innerBackground}
                                imageStyle={styles.backgroundPattern}
                            >
                                <View style={styles.formContainer}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            mode="flat"
                                            label="Registro"
                                            value={emailInputText}
                                            onChangeText={setEmailInputText}
                                            style={styles.input}
                                            theme={{
                                                colors: {
                                                    primary: "#011689",
                                                    background: "white"
                                                },
                                                fonts: {
                                                    regular: {
                                                        fontWeight: "bold"
                                                    }
                                                }
                                            }}
                                        />
                                        <TextInput
                                            mode="flat"
                                            label="Senha"
                                            secureTextEntry
                                            value={passwordInputText}
                                            onChangeText={setPasswordInputText}
                                            style={styles.input}
                                            theme={{
                                                colors: {
                                                    primary: "#011689",
                                                    background: "white"
                                                },
                                                fonts: {
                                                    regular: {
                                                        fontWeight: "bold"
                                                    }
                                                }
                                            }}
                                        />

                                        <View style={styles.buttonContainer}>
                                            <Button
                                                style={styles.button}
                                                buttonColor="#011689"
                                                mode="contained"
                                                icon="login"
                                                onPress={handleLogin}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <ActivityIndicator color="#FFF" />
                                                ) : (
                                                    "Entrar"
                                                )}
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </ScrollView>
                <Text style={styles.footerText} variant="bodySmall">
                    Feito por Instituto Mauá de Tecnologia
                </Text>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center"
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    innerContainer: {
        width: "100%",
        minHeight: 400,
        maxWidth: 600,
        backgroundColor: "white",
        borderRadius: 20,
        overflow: "hidden"
    },
    innerBackground: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    backgroundPattern: {
        opacity: 0.5,
        resizeMode: "cover"
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    inputView: {
        width: "100%",
        maxWidth: 400,
        alignItems: "center"
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 16
    },
    input: {
        width: "100%",
        marginBottom: 16,
        backgroundColor: "white",
        height: 56,
        fontSize: 16
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20
    },
    button: {
        width: "50%",
        borderRadius: 25,
        paddingVertical: 8
    },
    footerText: {
        textAlign: "center",
        color: "#555",
        paddingBottom: 20
    }
});
