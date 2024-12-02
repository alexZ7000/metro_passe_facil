import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Alert, Platform } from "react-native";

import { FaceDetectionResult } from "../../services/faceDetection";
import type { FaceDetectionScreenComponent } from "../../shared/@types/screens";

const FaceDetection: FaceDetectionScreenComponent = () => {
    const [detectedFaces, setDetectedFaces] =
        useState<FaceDetectionResult | null>(null);

    const handleImageSelect = async () => {
        if (Platform.OS === "web") {
            return new Promise<string | null>((resolve) => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = async (e: any) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        resolve(imageUrl);
                    } else {
                        resolve(null);
                    }
                };
                input.click();
            });
        }
        return null;
    };

    const handleDetectFace = async () => {
        try {
            const imageUrl = await handleImageSelect();
            if (imageUrl) {
                // Implementar lógica de detecção aqui
                setDetectedFaces({ faces: [] });
                Alert.alert("Sucesso", "Imagem selecionada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao detectar rosto:", error);
            Alert.alert("Erro", "Falha ao processar a imagem");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Detecção Facial</Text>
                <Button title="Selecionar Imagem" onPress={handleDetectFace} />
                {detectedFaces && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>
                            {detectedFaces.faces.length === 0
                                ? "Nenhum rosto detectado"
                                : `${detectedFaces.faces.length} rosto(s) detectado(s)`}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    resultText: {
        fontSize: 16,
        textAlign: "center"
    }
});

export default FaceDetection;
