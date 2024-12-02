import Header from "@components/nav/Header";
import Sidebar from "@components/nav/Sidebar";
import IAppRoutes from "@interfaces/IAppRoutes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type NavigationProp = NativeStackNavigationProp<IAppRoutes>;

export const PhotoCapture: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [imageUri, setImageUri] = useState<string | null>(null);

    // Reset image when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            return () => setImageUri(null);
        }, [])
    );

    return (
        <>
            <Header
                title="Monitoramento"
                icon="users"
                backgroundColor="#179330"
                textColor="white"
            />
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    <Button
                        mode="contained"
                        style={styles.aiButton}
                        labelStyle={styles.buttonLabel}
                        icon="face-recognition"
                        onPress={() => navigation.navigate("FaceDetection")}
                    >
                        Detecção de Rosto
                    </Button>

                    <Button
                        mode="contained"
                        style={styles.aiButton}
                        labelStyle={styles.buttonLabel}
                        icon="face-man"
                        onPress={() => navigation.navigate("FaceComparison")}
                    >
                        Comparação de Rostos
                    </Button>

                    {/* <Button
                        mode="contained"
                        style={styles.aiButton}
                        labelStyle={styles.buttonLabel}
                        icon="text-recognition"
                        onPress={() => navigation.navigate('TextDetection')}
                    >
                        Detecção de Texto
                    </Button> */}
                </View>

                <Sidebar activeRoute="live" height={400} />
            </View>
        </>
    );
};

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
        backgroundColor: "#179330",
        borderRadius: 8,
        paddingVertical: 10
    },
    buttonGroup: {
        width: "90%",
        gap: 15,
        marginBottom: 30
    },
    aiButton: {
        backgroundColor: "#179330",
        borderRadius: 8,
        paddingVertical: 8,
        elevation: 2
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "500"
    }
});

export default PhotoCapture;
