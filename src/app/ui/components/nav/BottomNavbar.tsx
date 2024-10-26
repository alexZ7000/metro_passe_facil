import useAppNavigation from "@functions/useAppNavigation";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

// FIXME: Ao abrir um teclado na aplicação, o BottomNavbar sobe junto com o teclado, o que não deveria acontecer.

export default function BottomNavbar() {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: "live", icon: "video" },
        { key: "headphones", icon: "headphones" },
        { key: "problem", icon: "alert" },
        { key: "add-person", icon: "account-plus" },
        { key: "logout", icon: "logout" }
    ];
    const navigation = useAppNavigation();

    return (
        <View style={styles.navigationBar}>
            {routes.map((route, idx) => (
                <IconButton
                    key={route.key}
                    icon={route.icon}
                    size={30}
                    iconColor={index === idx ? "#011689" : "#fff"}
                    onPress={() => {
                        if (route.key === "logout") {
                            navigation.navigate("Login");
                        }
                        if (route.key === "live") {
                            navigation.navigate("LiveMonitoring");
                        }
                        if (route.key === "add-person") {
                            navigation.navigate("Signup");
                        }
                        setIndex(idx);
                    }}
                    style={[
                        styles.iconButton,
                        index === idx && styles.activeButton
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    navigationBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#011689",
        paddingVertical: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5
    },
    iconButton: {
        borderRadius: 25
    },
    activeButton: {
        backgroundColor: "#fff"
    }
});
