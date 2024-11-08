import metroLogo from "@assets/metro-logo.png";
import useAppNavigation from "@functions/useAppNavigation";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Alert
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, IconButton } from "react-native-paper";

// FIXME: Funcionalidade de abrir câmera não funciona para WEB

export default function Signup() {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpfRg, setCpfRg] = useState("");
    const [tipoGratuidade, setTipoGratuidade] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null); // Definição do tipo
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useAppNavigation();

    useFocusEffect(
        useCallback(() => {
            return () => {
                setNome("");
                setDataNascimento("");
                setCpfRg("");
                setTipoGratuidade("");
                setImageUri(null); // Resetar a imagem ao sair
            };
        }, [])
    );

    const validateFields = () => {
        if (!nome || !dataNascimento || !cpfRg || !tipoGratuidade) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return false;
        }
        return true;
    };

    const handleDateConfirm = (date: Date) => {
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        setDataNascimento(formattedDate);
        setDatePickerVisibility(false);
    };

    const handleCadastro = () => {
        if (validateFields()) Alert.alert("Sucesso", "Usuário cadastrado!");
    };

    const handleImageUpload = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
                "Permissão necessária",
                "Você precisa dar permissão para usar a câmera!"
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Armazena a URI da imagem capturada
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <Image source={metroLogo} style={styles.logo} />
                <Text style={styles.title}>Cadastro de Usuários</Text>

                <TouchableOpacity
                    style={styles.imageUpload}
                    onPress={handleImageUpload}
                >
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <IconButton icon="plus" size={40} iconColor="#011689" />
                    )}
                </TouchableOpacity>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TouchableOpacity
                        onPress={() => setDatePickerVisibility(true)}
                        style={styles.input}
                    >
                        <Text style={styles.dateText}>
                            {dataNascimento || "Data de nascimento"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nº CPF"
                        value={cpfRg}
                        onChangeText={setCpfRg}
                        keyboardType="numeric"
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
                    onPress={handleCadastro}
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

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                    date={new Date()}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF0F4",
        position: "relative"
    },
    content: {
        flex: 1,
        padding: 20,
        paddingBottom: 60,
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
    imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: 8
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
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    dateText: {
        color: "black"
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
