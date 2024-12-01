import Header from "@components/nav/Header";
import Sidebar from "@components/nav/Sidebar";
import { useFocusEffect } from "@react-navigation/native";
import permissionToOpenCamera from "@shared/validations/permissionToOpenCamera";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { IconButton, Button } from "react-native-paper";

interface PhotoCaptureProps {
    onPhotoCapture?: (uri: string) => void;
    onPhotoCompare?: () => void;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
    onPhotoCapture,
    onPhotoCompare
}) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const capturePhoto = async () => {
        try {
            const capturedImageUri = await permissionToOpenCamera();

            if (capturedImageUri) {
                setImageUri(capturedImageUri);
                onPhotoCapture?.(capturedImageUri);
            } else {
                Alert.alert(
                    "Permissão necessária",
                    "Você precisa dar permissão para usar a câmera!"
                );
            }
        } catch (error) {
            Alert.alert("Erro", "Falha ao capturar foto");
        }
    };

    const comparePhoto = () => {
        if (!imageUri) {
            Alert.alert("Erro", "Primeiro, capture uma foto para comparar.");
            return;
        }

        onPhotoCompare?.() ??
            Alert.alert("Comparar", "A foto foi comparada com sucesso!");
    };

    // Reset image when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            return () => setImageUri(null);
        }, [])
    );

    return (
        <>
            <Header
                title="Cadastro de Usuários"
                icon="users"
                backgroundColor="#179330"
                textColor="white"
            />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.imageUpload}
                    onPress={capturePhoto}
                    testID="photo-capture-touchable"
                >
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                            testID="captured-image"
                        />
                    ) : (
                        <IconButton
                            icon="camera"
                            size={40}
                            iconColor="#179330"
                            testID="camera-icon"
                        />
                    )}
                </TouchableOpacity>

                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={comparePhoto}
                    testID="compare-button"
                >
                    Comparar
                </Button>
                <Sidebar
                    activeRoute="live"
                    backgroundColor="#179330"
                    height={400}
                />
            </View>
        </>
    );
};

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
        backgroundColor: "#179330",
        borderRadius: 8,
        paddingVertical: 10
    }
});

export default PhotoCapture;
