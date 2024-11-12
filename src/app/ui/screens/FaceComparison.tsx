import { firebase } from "@react-native-firebase/ml-vision";
import React, { useRef, useState } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { RNCamera } from "react-native-camera";

const FaceComparison: React.FC = () => {
    const cameraRef = useRef<RNCamera>(null);
    const [faceData1, setFaceData1] = useState<any>(null);
    const [faceData2, setFaceData2] = useState<any>(null);

    const captureFirstFace = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync({
                quality: 0.5,
                base64: false
            });
            const faceData = await detectFace(uri);
            setFaceData1(faceData);
            Alert.alert("Primeiro rosto detectado");
        }
    };

    const captureSecondFace = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync({
                quality: 0.5,
                base64: false
            });
            const faceData = await detectFace(uri);
            setFaceData2(faceData);
            Alert.alert("Segundo rosto detectado");
        }
    };

    const detectFace = async (uri: string) => {
        try {
            const faces = await firebase.ml().faceDetectorProcessImage(uri);
            return faces;
        } catch (error) {
            console.error("Erro ao detectar rosto:", error);
            return null;
        }
    };

    // Função para comparar dois rostos
    const compareFaces = () => {
        if (faceData1 && faceData2) {
            const isSimilar = faceData1.length === faceData2.length;

            if (isSimilar) {
                Alert.alert("É o mesmo rosto");
            } else {
                Alert.alert("Não é o mesmo rosto");
            }
        } else {
            Alert.alert("Por favor, capture dois rostos.");
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.front}
                captureAudio={false}
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

export default FaceComparison;
