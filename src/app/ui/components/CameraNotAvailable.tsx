import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CameraNotAvailable = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Câmera não disponível nesta plataforma.
            </Text>
            <Text style={styles.subtext}>
                Por favor, use um dispositivo móvel para acessar esta
                funcionalidade.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },
    subtext: {
        fontSize: 16,
        textAlign: "center",
        color: "#666"
    }
});

export default CameraNotAvailable;
