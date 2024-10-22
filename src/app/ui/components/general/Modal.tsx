import warningImage from "@assets/warning.png";
import CustomButton from "@components/general/CustomButton";
import { useState } from "react";
import { Image, View } from "react-native";
import {
    Modal,
    Portal,
    Text,
    Button as PaperButton,
    Provider as PaperProvider
} from "react-native-paper";

export default function ModalComponent() {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "red", padding: 20 };

    return (
        <PaperProvider>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={containerStyle}
                >
                    <View style={{ width: "100%" }}>
                        <Image
                            style={{ marginLeft: "auto", marginRight: "auto" }}
                            source={warningImage}
                        />
                        <Text
                            style={{
                                fontWeight: "700",
                                color: "white",
                                textAlign: "center",
                                marginBottom: 20
                            }}
                        >
                            Atenção possível usuário irregular identificado
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <CustomButton
                                buttonColor="#179330"
                                title="Aprovar"
                                onPress={() =>
                                    console.log("Aprovar pressionado")
                                }
                            />
                            <CustomButton
                                buttonColor="#C30000"
                                title="Enviar para revisão"
                                onPress={() =>
                                    console.log(
                                        "Enviar para revisão pressionado"
                                    )
                                }
                            />
                            <CustomButton
                                buttonColor="#FED50D"
                                title="Ignorar"
                                onPress={() =>
                                    console.log("Ignorar pressionado")
                                }
                            />
                        </View>
                    </View>
                </Modal>
            </Portal>
            <PaperButton style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </PaperButton>
        </PaperProvider>
    );
}
