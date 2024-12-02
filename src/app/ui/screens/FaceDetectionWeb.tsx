import useAppNavigation from "@functions/useAppNavigation";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const FaceDetectionWeb = () => {
    const navigation = useAppNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detecção Facial</Text>
            <Text style={styles.message}>
                Esta funcionalidade está disponível apenas no aplicativo móvel.
            </Text>
            <Button
                icon="keyboard-backspace"
                mode="contained"
                onPress={() => navigation.navigate("LiveMonitoring")}
            >
                Voltar
            </Button>
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333"
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
        color: "#666",
        lineHeight: 24
    }
});

export default FaceDetectionWeb;
