import metroLogo from "@assets/metro-logo.png";
import useAppNavigation from "@functions/useAppNavigation";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import { Button, IconButton } from "react-native-paper";

export default function CadastroTeste() {
    const [nome, setNome] = useState("Meu Nome");
    const [dataNascimento, setDataNascimento] = useState("dd/mm/aaaa");
    const [cpfRg, setCpfRg] = useState("xxx.xxx.xxx-xx");
    const [tipoGratuidade, setTipoGratuidade] = useState("idoso");
    //   const [termos, setTermos] = useState(false);
    const navigation = useAppNavigation();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.sidebar}>
                <IconButton icon="account-plus" size={30} />
                <IconButton icon="headphones" size={30} />
                <View style={styles.circle} />
                <IconButton icon="exit-to-app" size={30} />
            </View>

            <View style={styles.content}>
                <Image source={metroLogo} style={styles.logo} />
                <Text style={styles.title}>Cadastro de Usuários</Text>

                <TouchableOpacity style={styles.imageUpload}>
                    <IconButton icon="plus" size={40} iconColor="#011689" />
                </TouchableOpacity>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data de nascimento"
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                    />
                </View>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nº CPF / RG"
                        value={cpfRg}
                        onChangeText={setCpfRg}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de Gratuidade"
                        value={tipoGratuidade}
                        onChangeText={setTipoGratuidade}
                    />
                </View>

                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => alert("Usuário cadastrado!")}
                >
                    Cadastrar
                </Button>

                <View style={styles.buttonContainer}>
                    <Button
                        style={[styles.button, { width: "100%" }]}
                        buttonColor="#011689"
                        icon="login"
                        mode="contained"
                        onPress={() => navigation.navigate("MainTabs")}
                    >
                        Entrar
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#EEF0F4"
    },
    sidebar: {
        width: 80,
        backgroundColor: "#9164cc",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 20
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        marginVertical: 10
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    logo: {
        alignSelf: "flex-end",
        width: 50,
        height: 50,
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#9164cc",
        textAlign: "center",
        marginBottom: 20
    },
    imageUpload: {
        backgroundColor: "#e0e0e0",
        width: 100,
        height: 100,
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
    },
    input: {
        flex: 1,
        backgroundColor: "#e0e0e0",
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 5
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    checkboxText: {
        marginLeft: 10,
        color: "#555"
    },
    button: {
        backgroundColor: "#011689",
        borderRadius: 8,
        paddingVertical: 10
    },
    buttonContainer: {
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%"
    }
});
