import { View, StyleSheet, Text } from "react-native";
import { Button, Appbar } from "react-native-paper";

export default function VideoCall() {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Video Call" />
            </Appbar.Header>

            <View style={styles.videoContainer}>
                <Text>
                    Aqui vai ficar o vídeo da videochamada, ela foi tirada para
                    evitar conflitos no npx expo start
                </Text>
            </View>

            <View style={styles.controls}>
                <Button mode="contained">Iniciar Câmera</Button>
                <Button mode="contained">Iniciar Chamada</Button>
                <Button mode="contained">Encerrar Chamada</Button>
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
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
    },
    remoteVideo: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center"
    }
});
