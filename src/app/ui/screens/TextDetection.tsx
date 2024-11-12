import TextRecognition from "@react-native-ml-kit/text-recognition";
import React, { useRef, useCallback } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { RNCamera } from "react-native-camera";

const TextDetection: React.FC = () => {
    const cameraRef = useRef<RNCamera>(null);

    const handleTextDetection = useCallback(async () => {
        if (cameraRef.current) {
            try {
                const { uri } = await cameraRef.current.takePictureAsync({
                    quality: 0.5,
                    base64: false
                });
                const processedText = await TextRecognition.recognize(uri);

                if (processedText && processedText.length > 0) {
                    const detectedText = processedText
                        .map((block: any) => block.text)
                        .join("\n");
                    Alert.alert("Texto Detectado", detectedText);
                } else {
                    Alert.alert("Nenhum texto detectado.");
                }
            } catch (error) {
                console.error("Erro ao detectar texto:", error);
                Alert.alert("Erro ao detectar texto.");
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
            />
            <View style={styles.buttonContainer}>
                <Button title="Detectar Texto" onPress={handleTextDetection} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1, width: "100%" },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: "center"
    }
});

export default TextDetection;
