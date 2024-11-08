import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { RTCView, mediaDevices, RTCPeerConnection } from "react-native-webrtc";

const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export default function VideoCall() {
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
        const offer = await peerConnection.current.createOffer({});
        await peerConnection.current.setLocalDescription(offer);
    };

    const endCall = () => {
        peerConnection.current.close();
        setLocalStream(null);
        setRemoteStream(null);
    };

    (peerConnection.current as any).ontrack = (event: RTCTrackEvent) => {
        setRemoteStream(event.streams[0]);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Video Call" />
            </Appbar.Header>

            <View style={styles.videoContainer}>
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
                <Button mode="contained" onPress={startLocalStream}>
                    Iniciar Câmera
                </Button>
                <Button mode="contained" onPress={initiateCall}>
                    Iniciar Chamada
                </Button>
                <Button mode="contained" onPress={endCall}>
                    Encerrar Chamada
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 100
    },
    videoContainer: {
        flex: 1,
        flexDirection: "row"
    },
    localVideo: {
        width: "50%",
        height: "100%",
        backgroundColor: "#000"
    },
    remoteVideo: {
        width: "50%",
        height: "100%",
        backgroundColor: "#000"
    },
    controls: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    }
});
