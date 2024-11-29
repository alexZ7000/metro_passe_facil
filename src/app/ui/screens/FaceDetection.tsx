import React, { useRef, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RNCamera } from "react-native-camera";

const FaceDetection: React.FC = () => {
    const cameraRef = useRef<RNCamera>(null);

    const handleFaceDetection = useCallback((faceData: any) => {
        if (faceData.faces && faceData.faces.length > 0) {
            console.log("Rostos detectados:", faceData.faces);
        }
    }, []);

    return (
        <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
            onFacesDetected={handleFaceDetection}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        >
            <View style={styles.overlay}>
                <Text style={styles.text}>Aponte a câmera para um rosto</Text>
            </View>
        </RNCamera>
    );
};

const styles = StyleSheet.create({
    camera: { flex: 1, width: "100%" },
    overlay: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: "center"
    },
    text: { fontSize: 18, color: "white" }
});

export default FaceDetection;
