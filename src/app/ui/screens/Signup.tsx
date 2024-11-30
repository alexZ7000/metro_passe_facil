import useAppNavigation from "@functions/useAppNavigation";
import { db, storage } from "@modules/api";
import { useFocusEffect } from "@react-navigation/native";
import permissionToOpenCamera from "@shared/validations/permissionToOpenCamera";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    Alert,
    useWindowDimensions,
    ScrollView
    // Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, IconButton } from "react-native-paper";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import Header from "@components/nav/Header";
import Sidebar from "@components/nav/Sidebar";

// FIXME: Funcionalidade de abrir câmera não funciona para WEB

export default function Signup() {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpfRg, setCpfRg] = useState("");
    const [tipoGratuidade, setTipoGratuidade] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useAppNavigation();
    const { width } = useWindowDimensions();
    const isWideScreen = width > 1000;

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

    useFocusEffect(
        useCallback(() => {
            return () => {
                setNome("");
                setDataNascimento("");
                setCpfRg("");
                setTipoGratuidade("");
                setImageUri(null);
            };
        }, [])
    );

    const handleDateConfirm = (date: Date) => {
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        setDataNascimento(formattedDate);
        setDatePickerVisibility(false);
    };

    const handleCadastro = async () => {
        if (!validateFields()) return;

        try {
            let imageUrl = null;

            if (imageUri) {
                const imageRef = ref(storage, `cadastros/${uuidv4()}`);
                const response = await fetch(imageUri);
                const blob = await response.blob();
                await uploadBytes(imageRef, blob);
                imageUrl = await getDownloadURL(imageRef); // Obtém a URL pública da imagem
            }

            const userId = uuidv4();

            const cadastroData = {
                id: userId,
                nome,
                dataNascimento,
                cpfRg,
                tipoGratuidade,
                imageUrl
            };

            await addDoc(collection(db, "cadastros"), cadastroData);

            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            navigation.navigate("MainTabs");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            Alert.alert("Erro", "Não foi possível concluir o cadastro.");
        }
    };

    const handleImageUpload = async () => {
        const permissionResult = await permissionToOpenCamera();
        permissionResult
            ? setImageUri(permissionResult)
            : Alert.alert(
                  "Permissão necessária",
                  "Você precisa dar permissão para usar a câmera!"
              );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Feather name="users" size={40} color="white" />
                    <View style={styles.headerSeparator} />
                    <Text style={styles.headerTitle}>Cadastro de Usuários</Text>
                    </View>
                    <Image
                    source={metroLogo}
                    style={styles.logo}
                    resizeMode="contain"
                    />
                    </View> */}
            <Header
                title="Cadastro de Usuários"
                icon="users"
                backgroundColor="#9164cc"
                textColor="white"
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    {/* styles.container && */}
                    {/* <View style={styles.content}> */}
                    {/* <Image source={metroLogo} style={styles.logo} />
                <Text style={styles.title}>Cadastro de Usuários</Text> */}
                    <Sidebar
                        activeRoute="add-person"
                        backgroundColor="#9164cc"
                        height={400} // Ajuste conforme necessário
                    />

                    <View
                        style={[
                            styles.formRow,
                            !isWideScreen && styles.formColumn
                        ]}
                    >
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
                                <IconButton
                                    icon="plus"
                                    size={40}
                                    iconColor="#9164cc"
                                />
                            )}
                        </TouchableOpacity>

                        <View style={styles.inputColumn}>
                            <View style={styles.inputGroup}>
                                <View
                                    style={[
                                        styles.inputGroup,
                                        !isWideScreen && styles.inputRow
                                    ]}
                                >
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nome"
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setDatePickerVisibility(true)
                                        }
                                        style={styles.input}
                                    >
                                        <Text style={styles.dateText}>
                                            {dataNascimento ||
                                                "Data de nascimento"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={[
                                        styles.inputGroup,
                                        !isWideScreen && styles.inputRow
                                    ]}
                                >
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

                                <View style={styles.buttonContainer}>
                                    <Button
                                        mode="contained"
                                        style={styles.button}
                                        onPress={handleCadastro}
                                    >
                                        Cadastrar
                                    </Button>
                                    {/* <Button
                                        style={styles.button}
                                        buttonColor="#1694cc"
                                        icon="login"
                                        mode="contained"
                                        onPress={() =>
                                            navigation.navigate("MainTabs")
                                        }
                                    >
                                        Entrar
                                    </Button> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                    date={new Date()}
                />
            </ScrollView>
            {/* <BottomNavbar /> */}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 100,
        paddingHorizontal: 16,
        height: "100%",
        paddingLeft: 50,
        paddingRight: 24, // Aumentado o padding horizontal
        paddingBottom: 24 // Adicionado padding na parte inferior
    },
    scrollViewContent: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#EEF0F4",
        position: "relative"
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
        backgroundColor: "#9164cc",
        color: "#fff",
        textAlign: "center",
        // marginBottom: 10,
        paddingLeft: "59%"
    },
    formRow: {
        flex: 1,
        flexDirection: "row",
        gap: 24
    },
    sidebarAdaptor: {
        marginLeft: 50
    },
    formColumn: {
        flexDirection: "column"
    },
    imageUpload: {
        flex: 1,
        backgroundColor: "#e0e0e0",
        width: "50%",
        height: "100%",
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
        // paddingRight: 100
        // marginBottom: 20
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    },
    inputGroup: {
        gap: 16
    },
    inputColumn: {
        flex: 1,
        gap: 16,
        justifyContent: "space-between"
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16
    },
    input: {
        flex: 1,
        backgroundColor: "#e0e0e0",
        borderRadius: 8,
        padding: "4%",
        justifyContent: "center"
    },
    dateText: {
        color: "black"
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16
    },
    button: {
        backgroundColor: "#9164cc",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20
    }
});
