import TextRecognition from "@react-native-ml-kit/text-recognition";
import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Alert, Platform } from "react-native";

const TextDetection: React.FC = () => {
    const [detectedText, setDetectedText] = useState<string>("");

    const captureImage = async () => {
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

    const detectText = async () => {
        try {
            const imageUri = await captureImage();
            if (imageUri) {
                const result: any = await TextRecognition.recognize(imageUri);
                const text = result.map((block: any) => block.text).join("\n");
                setDetectedText(text);
                if (!text) {
                    Alert.alert("Aviso", "Nenhum texto detectado na imagem.");
                }
            }
        } catch (error) {
            console.error("Erro ao detectar texto:", error);
            Alert.alert("Erro", "Falha ao processar a imagem");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Selecionar Imagem" onPress={detectText} />
            </View>
            {detectedText ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Texto Detectado:</Text>
                    <Text style={styles.resultText}>{detectedText}</Text>
                </View>
            ) : (
                <Text style={styles.placeholder}>
                    Selecione uma imagem para detectar texto
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    buttonContainer: {
        marginBottom: 20
    },
    resultContainer: {
        backgroundColor: "white",
        padding: 15,
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
    resultTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    resultText: {
        fontSize: 16,
        lineHeight: 24
    },
    placeholder: {
        textAlign: "center",
        color: "#666",
        fontSize: 16
    }
});

export default TextDetection;
