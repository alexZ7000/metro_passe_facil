import Header from "@components/nav/Header";
import useAppNavigation from "@functions/useAppNavigation";
import { db, storage } from "@modules/api";
import { useFocusEffect } from "@react-navigation/native";
import permissionToOpenCamera from "@shared/validations/permissionToOpenCamera";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useCallback } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Alert,
    useWindowDimensions,
    ScrollView
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, IconButton, Text } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

export default function Signup() {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpfRg, setCpfRg] = useState("");
    const [tipoGratuidade, setTipoGratuidade] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useAppNavigation();
    const { width, height } = useWindowDimensions();
    const isWideScreen = width > 768;
    const isVerySmallScreen = width < 360;

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

    const handleCadastro = async () => {
        if (!validateFields()) return;

        try {
            let imageUrl = null;

            if (imageUri) {
                const imageRef = ref(storage, `cadastros/${uuidv4()}`);
                const response = await fetch(imageUri);
                const blob = await response.blob();
                await uploadBytes(imageRef, blob);
                imageUrl = await getDownloadURL(imageRef);
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

    const ContentWrapper = !isWideScreen ? ScrollView : View;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Header
                title="Cadastro de Usuários"
                icon="users"
                backgroundColor="#9164cc"
                textColor="white"
            />
            <ContentWrapper style={styles.content}>
                <View
                    style={[styles.formRow, !isWideScreen && styles.formColumn]}
                >
                    <TouchableOpacity
                        style={[
                            styles.imageUpload,
                            { flex: isWideScreen ? 0.6 : 1 }
                        ]}
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

                    <View
                        style={[
                            styles.inputColumn,
                            { flex: isWideScreen ? 0.4 : 1 }
                        ]}
                    >
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
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={handleCadastro}
                        >
                            Cadastrar
                        </Button>
                    </View>
                </View>
            </ContentWrapper>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                date={new Date()}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF0F4"
    },
    content: {
        flex: 1,
        padding: 24
    },
    formRow: {
        flex: 1,
        flexDirection: "row",
        gap: 24
    },
    formColumn: {
        flexDirection: "column"
    },
    imageUpload: {
        backgroundColor: "#e0e0e0",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 3 / 4
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    },
    inputColumn: {
        justifyContent: "flex-start"
    },
    input: {
        backgroundColor: "#e0e0e0",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12
    },
    button: {
        backgroundColor: "#9164cc",
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 12
    }
});
