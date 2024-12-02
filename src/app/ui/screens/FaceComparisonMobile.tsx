import React, { useRef, useState } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import {
    Camera,
    useCameraDevices,
    CameraDevice
} from "react-native-vision-camera";

import { detectFace, FaceDetectionResult } from "../../services/faceDetection";

const FaceComparisonMobile: React.FC = () => {
    const devices = useCameraDevices();
    const frontCamera = devices.find(
        (device) => device.position === "front"
    ) as CameraDevice | undefined;
    const camera = useRef<Camera>(null);
    const [faceData1, setFaceData1] = useState<FaceDetectionResult | null>(
        null
    );
    const [faceData2, setFaceData2] = useState<FaceDetectionResult | null>(
        null
    );

    const capturePhoto = async () => {
        if (camera.current) {
            const photo = await camera.current.takePhoto({
                flash: "off"
            });
            return photo.path;
        }
        return null;
    };

    const captureFirstFace = async () => {
        try {
            const photoUri = await capturePhoto();
            if (photoUri) {
                const faceData = await detectFace(photoUri);
                setFaceData1(faceData);
                Alert.alert("Primeiro rosto detectado");
            }
        } catch (error) {
            console.error("Erro ao capturar foto:", error);
            Alert.alert("Erro", "Falha ao capturar foto");
        }
    };

    const captureSecondFace = async () => {
        try {
            const photoUri = await capturePhoto();
            if (photoUri) {
                const faceData = await detectFace(photoUri);
                setFaceData2(faceData);
                Alert.alert("Segundo rosto detectado");
            }
        } catch (error) {
            console.error("Erro ao capturar foto:", error);
            Alert.alert("Erro", "Falha ao capturar foto");
        }
    };

    const compareFaces = () => {
        if (faceData1?.faces.length && faceData2?.faces.length) {
            const isSimilar =
                Math.abs(faceData1.faces.length - faceData2.faces.length) <= 1;
            Alert.alert(isSimilar ? "É o mesmo rosto" : "Não é o mesmo rosto");
        } else {
            Alert.alert("Por favor, capture dois rostos.");
        }
    };

    if (!frontCamera) {
        return (
            <View style={styles.container}>
                <Button title="Carregando câmera..." disabled />
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
            <View style={styles.buttonContainer}>
                <Button
                    title="Capturar Primeiro Rosto"
                    onPress={captureFirstFace}
                />
                <Button
                    title="Capturar Segundo Rosto"
                    onPress={captureSecondFace}
                />
                <Button title="Comparar Rostos" onPress={compareFaces} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1,
        width: "100%"
    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: "center",
        gap: 10,
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.3)"
    }
});

export default FaceComparisonMobile;
