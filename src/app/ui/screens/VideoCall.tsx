import { Audio } from "expo-av";
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Alert
} from "react-native";
import {
    createAgoraRtcEngine,
    RtcSurfaceView,
    RtcConnection
} from "react-native-agora";
import { Camera } from "react-native-vision-camera";

const { width, height } = Dimensions.get("window");

const VideoCallScreen: React.FC = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMicrophonePermission, setHasMicrophonePermission] =
        useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [remoteUid, setRemoteUid] = useState<number | null>(null);

    const rtcEngine = createAgoraRtcEngine();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermission();
            const microphonePermission = await Audio.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission === "granted");
            setHasMicrophonePermission(
                microphonePermission.status === "granted"
            );
        })();

        const initRtcEngine = () => {
            rtcEngine.initialize({
                appId: "YOUR_APP_ID" // Substitua pelo seu App ID do Agora
            });
            rtcEngine.enableVideo();

            rtcEngine.registerEventHandler({
                onJoinChannelSuccess: (
                    connection: RtcConnection,
                    elapsed: number
                ) => {
                    console.log(
                        `Entrou no canal ${connection.channelId} com UID ${connection.localUid}. Elapsed: ${elapsed}`
                    );
                },
                onUserJoined: (uid) => {
                    setRemoteUid(uid as number);
                    console.log(`Usuário remoto ${uid} entrou no canal`);
                },
                onUserOffline: () => {
                    setRemoteUid(null);
                    console.log("Usuário remoto saiu do canal");
                }
            });
        };
        initRtcEngine();

        return () => {
            rtcEngine?.leaveChannel();
        };
    }, []);

    const startCall = () => {
        if (hasCameraPermission && hasMicrophonePermission && rtcEngine) {
            rtcEngine.joinChannel(
                "", // Token de autenticação (se não estiver utilizando, pode ser uma string vazia "")
                "channel-name", // Nome do canal
                0, // UID local, passe `null` ou `0` para atribuição automática
                {
                    autoSubscribeAudio: true,
                    autoSubscribeVideo: true
                } // ChannelMediaOptions
            );
            setIsCallActive(true);
        } else {
            Alert.alert(
                "Erro",
                "Permissões de câmera ou microfone não concedidas"
            );
        }
    };

    const endCall = () => {
        if (rtcEngine) {
            rtcEngine.leaveChannel();
        }
        setIsCallActive(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.statusText}>
                    {isCallActive ? "Em chamada" : "Conectar-se à chamada"}
                </Text>
            </View>

            {isCallActive ? (
                <View style={styles.callContainer}>
                    {/* Exibição de vídeo local */}
                    <RtcSurfaceView
                        style={styles.localView}
                        zOrderMediaOverlay
                        canvas={{
                            uid: 0 // UID local para renderização do vídeo local
                        }}
                    />
                    {/* Exibição de vídeo remoto */}
                    {remoteUid !== null && (
                        <RtcSurfaceView
                            style={styles.remoteView}
                            canvas={{
                                uid: remoteUid // UID do usuário remoto
                            }}
                        />
                    )}
                </View>
            ) : (
                <Text style={styles.instructionText}>
                    Aguardando conexão...
                </Text>
            )}

            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={isCallActive ? endCall : startCall}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isCallActive ? "Finalizar Chamada" : "Iniciar Chamada"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Metrô Videochamada</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#000"
    },
    topBar: {
        paddingTop: 20,
        alignItems: "center"
    },
    statusText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    callContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    localView: {
        width: width * 0.4,
        height: height * 0.3,
        position: "absolute",
        top: 10,
        left: 10,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10
    },
    remoteView: {
        width: width * 0.9,
        height: height * 0.75
    },
    instructionText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    },
    footer: {
        paddingBottom: 10,
        alignItems: "center"
    },
    footerText: {
        color: "#fff",
        fontSize: 12
    }
});

export default VideoCallScreen;
