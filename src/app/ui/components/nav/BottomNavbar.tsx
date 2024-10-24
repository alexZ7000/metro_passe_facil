import useAppNavigation from "@functions/useAppNavigation";
import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface BottomNavBarProps {
    index: number;
    setIndex: (index: number) => void;
}

export default function BottomNavBar({ index, setIndex }: BottomNavBarProps) {
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
                    onPress={
                        route.key === "logout"
                            ? () => navigation.navigate("Login")
                            : () => setIndex(idx)
                    }
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
