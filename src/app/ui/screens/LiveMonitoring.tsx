import Header from "@components/nav/Header";
import Sidebar from "@components/nav/Sidebar";
import IAppRoutes from "@interfaces/IAppRoutes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import permissionToOpenCamera from "@shared/validations/permissionToOpenCamera";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { IconButton, Button } from "react-native-paper";

type NavigationProp = NativeStackNavigationProp<IAppRoutes>;

interface PhotoCaptureProps {
    onPhotoCapture?: (uri: string) => void;
    onPhotoCompare?: () => void;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
    onPhotoCapture,
    onPhotoCompare
}) => {
    const navigation = useNavigation<NavigationProp>();
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
                title="Monitoramento"
                icon="users"
                backgroundColor="#179330"
                textColor="white"
            />
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    <Button
                        mode="contained"
                        style={styles.aiButton}
                        labelStyle={styles.buttonLabel}
                        icon="face-recognition"
                        onPress={() => navigation.navigate("FaceDetection")}
                    >
                        Detecção de Rosto
                    </Button>

                    <Button
                        mode="contained"
                        style={styles.aiButton}
                        labelStyle={styles.buttonLabel}
                        icon="face-man"
                        onPress={() => navigation.navigate("FaceComparison")}
                    >
                        Comparação de Rostos
                    </Button>

                    {/* <Button
                        mode="contained"
                        style={styles.aiButton}
                        labelStyle={styles.buttonLabel}
                        icon="text-recognition"
                        onPress={() => navigation.navigate('TextDetection')}
                    >
                        Detecção de Texto
                    </Button> */}
                </View>

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
    },
    buttonGroup: {
        width: "90%",
        gap: 15,
        marginBottom: 30
    },
    aiButton: {
        backgroundColor: "#179330",
        borderRadius: 8,
        paddingVertical: 8,
        elevation: 2
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "500"
    }
});

export default PhotoCapture;
