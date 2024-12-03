import Header from "@components/nav/Header";
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { Button, Appbar } from "react-native-paper";

export default function VideoCall() {
    return (
        <KeyboardAvoidingView
            style={styles.contains}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Header
                title="Atendimento remoto"
                icon="headphones"
                backgroundColor="#f7b731"
                textColor="white"
            />

            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.Content title="Video Call" />
                </Appbar.Header>

                <View style={styles.videoContainer}>
                    <Text>
                        Aqui vai ficar o vídeo da videochamada, ela foi tirada
                        para evitar conflitos no npx expo start
                    </Text>
                </View>

                <View style={styles.controls}>
                    <Button mode="contained">Iniciar Câmera</Button>
                    <Button mode="contained">Iniciar Chamada</Button>
                    <Button mode="contained">Encerrar Chamada</Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 100
    },
    contains: {
        flex: 1,
        backgroundColor: "#EEF0F4",
        position: "relative"
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
