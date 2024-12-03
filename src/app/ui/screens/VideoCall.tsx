import Header from "@components/nav/Header";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import { Button, Appbar, IconButton } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function VideoCall() {
    const [isCallStarted, setIsCallStarted] = useState(false);

    const startCall = () => setIsCallStarted(true);
    const endCall = () => setIsCallStarted(false);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Header
                title="Atendimento remoto"
                icon="headphones"
                backgroundColor="#f7b731"
                textColor="white"
            />

            <View style={styles.content}>
                <View
                    style={[
                        styles.videoContainer,
                        !isCallStarted && styles.videoContainerInactive
                    ]}
                >
                    {/* Video fica aqui*/}
                </View>

                <View style={styles.controls}>
                    {!isCallStarted ? (
                        <Button
                            mode="contained"
                            onPress={startCall}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                        >
                            Iniciar Chamada
                        </Button>
                    ) : (
                        <Button
                            mode="contained"
                            onPress={endCall}
                            style={[styles.button, styles.endCallButton]}
                            labelStyle={styles.buttonLabel}
                        >
                            Encerrar Chamada
                        </Button>
                    )}
                </View>

                {isCallStarted && (
                    <View style={styles.floatingControls}>
                        <IconButton
                            icon={() => (
                                <MaterialIcons
                                    name="mic"
                                    size={24}
                                    color="white"
                                />
                            )}
                            style={styles.floatingButton}
                            onPress={() => {
                                /* Toggle mic - ativar*/
                            }}
                        />
                        <IconButton
                            icon={() => (
                                <MaterialIcons
                                    name="videocam"
                                    size={24}
                                    color="white"
                                />
                            )}
                            style={styles.floatingButton}
                            onPress={() => {
                                /* Toggle camera - ativar */
                            }}
                        />
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF0F4"
    },
    appbar: {
        backgroundColor: "#f7b731"
    },
    content: {
        flex: 1,
        justifyContent: "space-between"
    },
    videoContainer: {
        flex: 1,
        backgroundColor: "#000",
        margin: 16,
        borderRadius: 8
    },
    videoContainerInactive: {
        backgroundColor: "#e0e0e0"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 16
    },
    button: {
        backgroundColor: "#f7b731",
        paddingHorizontal: 32,
        paddingVertical: 8
    },
    buttonLabel: {
        fontSize: 18,
        color: "white"
    },
    endCallButton: {
        backgroundColor: "#FF3B30"
    },
    floatingControls: {
        position: "absolute",
        bottom: 100,
        left: 16,
        flexDirection: "row"
    },
    floatingButton: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        margin: 4
    }
});
