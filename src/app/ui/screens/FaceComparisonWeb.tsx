import IAppRoutes from "@interfaces/IAppRoutes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FaceComparisonWeb = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comparação Facial</Text>
            <Text style={styles.message}>
                Esta funcionalidade está disponível apenas no aplicativo móvel.
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

export default FaceComparisonWeb;
