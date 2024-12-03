import Header from "@components/nav/Header";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import { Button, Appbar, IconButton } from "react-native-paper";
import { RTCView, mediaDevices, RTCPeerConnection } from "react-native-webrtc";

const { width, height } = Dimensions.get("window");
const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};
export default function VideoCall() {
    const [isCallStarted, setIsCallStarted] = useState(false);

    const startCall = () => setIsCallStarted(true);
    const endCall = () => setIsCallStarted(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const peerConnection = useRef<RTCPeerConnection>(
        new RTCPeerConnection(configuration)
    );

    const startLocalStream = async () => {
        try {
            const stream = await mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setLocalStream(stream as unknown as MediaStream);
            stream.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, stream);
            });
        } catch (error) {
            console.error("Erro ao acessar câmera/mic:", error);
        }
    };

    const initiateCall = async () => {
        startLocalStream();
        const offer = await peerConnection.current.createOffer({});
        await peerConnection.current.setLocalDescription(offer);
    };

    (peerConnection.current as any).ontrack = (event: RTCTrackEvent) => {
        setRemoteStream(event.streams[0]);
    };

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
                    {localStream && (
                        <RTCView
                            streamURL={localStream?.id || ""}
                            style={styles.localVideo}
                        />
                    )}
                    {remoteStream && (
                        <RTCView
                            streamURL={localStream?.id || ""}
                            style={styles.localVideo}
                        />
                    )}
                </View>

                <View style={styles.controls}>
                    {!isCallStarted ? (
                        <Button
                            mode="contained"
                            onPress={initiateCall}
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
                            onPress={startLocalStream}
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
    localVideo: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
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
