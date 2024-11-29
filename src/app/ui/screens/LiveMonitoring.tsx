import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { IconButton, Button } from "react-native-paper";

export default function PhotoCapture() {
    const [imageUri, setImageUri] = useState<string | null>(null); // Para armazenar a URI da imagem

    // Função que solicita permissão e abre a câmera
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

    // Função para comparar a imagem capturada com algum outro critério
    const handleCompare = () => {
        if (!imageUri) {
            Alert.alert("Erro", "Primeiro, capture uma foto para comparar.");
            return;
        }

        // Lógica de comparação aqui (exemplo fictício)
        Alert.alert("Comparar", "A foto foi comparada com sucesso!");
    };

    return (
        <View style={styles.container}>
            {/* Botão de captura de foto */}
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
                    <IconButton icon="camera" size={40} iconColor="#011689" />
                )}
            </TouchableOpacity>

            {/* Botão para comparar */}
            <Button
                mode="contained"
                style={styles.button}
                onPress={handleCompare}
            >
                Comparar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEF0F4"
    },
    imageUpload: {
        backgroundColor: "#e0e0e0",
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    },
    button: {
        backgroundColor: "#011689",
        borderRadius: 8,
        paddingVertical: 10
    }
});
