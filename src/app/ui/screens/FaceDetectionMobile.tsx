import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Alert, Platform } from "react-native";

import { FaceDetectionResult } from "../../services/faceDetection";
import { isMobile } from "../../utils/platform";

// Importação condicional da câmera
let Camera: any;
let useCameraDevices: any;
if (isMobile) {
    const VisionCamera = require("react-native-vision-camera");
    Camera = VisionCamera.Camera;
    useCameraDevices = VisionCamera.useCameraDevices;
}

const FaceDetectionMobile: React.FC = () => {
    // Retorna um componente vazio se estiver na web
    if (Platform.OS === "web") {
        return null;
    }

    const devices = useCameraDevices();
    const frontCamera = devices?.find(
        (device: any) => device.position === "front"
    );
    const camera = useRef<any>(null);
    const [detectedFaces, setDetectedFaces] =
        useState<FaceDetectionResult | null>(null);

    const handleFaceDetection = async () => {
        if (camera.current) {
            try {
                const photo = await camera.current.takePhoto({
                    flash: "off"
                });

                // Implementar lógica de detecção aqui
                setDetectedFaces({ faces: [] });
                Alert.alert("Sucesso", "Foto capturada!");
            } catch (error) {
                console.error("Erro ao detectar rosto:", error);
                Alert.alert("Erro", "Falha ao processar a imagem");
            }
        }
    };

    if (!frontCamera) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Carregando câmera...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={camera}
                style={styles.camera}
                device={frontCamera}
                isActive
                photo
            />
            <View style={styles.overlay}>
                <Text style={styles.text} onPress={handleFaceDetection}>
                    Toque para detectar rosto
                </Text>
                {detectedFaces && (
                    <Text style={styles.resultText}>
                        {detectedFaces.faces.length === 0
                            ? "Nenhum rosto detectado"
                            : `${detectedFaces.faces.length} rosto(s) detectado(s)`}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    camera: {
        flex: 1,
        width: "100%"
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        color: "white",
        marginBottom: 10,
        textAlign: "center"
    },
    resultText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginTop: 10
    }
});

export default FaceDetectionMobile;
