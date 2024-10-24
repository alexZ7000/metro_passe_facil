import metroLogo from "@assets/metro-logo.png";
import NavHome from "@components/Home/NavHome";
import { useState } from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

export default function Login() {
    const [emailInputText, setEmailInputEmailInputText] = useState("");
    const [passwordInputText, setPasswordInputEmailInputText] = useState("");
    const screenHeight = Dimensions.get("window").height;

    return (
        <View>
            <NavHome />
            <View
                style={{
                    height: screenHeight,
                    margin: "auto",
                    marginLeft: 30,
                    marginRight: 30,
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <ImageBackground
                    source={metroLogo}
                    style={{
                        width: 200,
                        height: 200,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                />
                <TextInput
                    mode="outlined"
                    label="E-mail"
                    value={emailInputText}
                    placeholder="Insira seu e-mail"
                    onChangeText={(text) => setEmailInputEmailInputText(text)}
                />
                <TextInput
                    mode="outlined"
                    label="Senha"
                    value={passwordInputText}
                    placeholder="Insira sua senha"
                    onChangeText={(text) =>
                        setPasswordInputEmailInputText(text)
                    }
                />
                <View
                    style={{
                        marginTop: 20,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <Button
                        style={{
                            width: "200%",
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center"
                        }}
                        buttonColor="#011689"
                        icon="login"
                        mode="contained"
                        onPress={() => console.log("pressionado")}
                    >
                        Entrar
                    </Button>
                </View>
                <Text
                    style={{
                        position: "absolute",
                        bottom: screenHeight * (10 / 100)
                    }}
                    variant="bodySmall"
                >
                    Instituto Mauá de Tecnologia
                </Text>
            </View>
        </View>
    );
}
