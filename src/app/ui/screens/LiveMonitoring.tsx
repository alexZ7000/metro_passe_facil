import { useFocusEffect } from "@react-navigation/native";
import permissionToOpenCamera from "@shared/validations/permissionToOpenCamera";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { IconButton, Button } from "react-native-paper";

export default function PhotoCapture() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleImageUpload = async () => {
        const permissionResult = await permissionToOpenCamera();
        permissionResult
            ? setImageUri(permissionResult)
            : Alert.alert(
                  "Permissão necessária",
                  "Você precisa dar permissão para usar a câmera!"
              );
    };

    const handleCompare = () => {
        if (!imageUri) {
            Alert.alert("Erro", "Primeiro, capture uma foto para comparar.");
            return;
        }

        Alert.alert("Comparar", "A foto foi comparada com sucesso!");
    };

    useFocusEffect(
        useCallback(() => {
            return () => setImageUri(null);
        }, [])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.imageUpload}
                onPress={handleImageUpload}
            >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.imagePreview}
                    />
                ) : (
                    <IconButton icon="camera" size={40} iconColor="#011689" />
                )}
            </TouchableOpacity>

            <Button
                mode="contained"
                style={styles.button}
                onPress={handleCompare}
            >
                Comparar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEF0F4"
    },
    imageUpload: {
        backgroundColor: "#e0e0e0",
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    },
    button: {
        backgroundColor: "#011689",
        borderRadius: 8,
        paddingVertical: 10
    }
});
