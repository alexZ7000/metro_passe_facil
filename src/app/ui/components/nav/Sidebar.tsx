import { Feather } from "@expo/vector-icons";
import useAppNavigation from "@functions/useAppNavigation";
import { auth } from "@modules/api";
import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    useWindowDimensions,
    Dimensions
} from "react-native";

interface SidebarProps {
    activeRoute: string;
    backgroundColor: string;
    height?: number;
}

export default function Sidebar({
    activeRoute,
    backgroundColor,
    height
}: SidebarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { width } = useWindowDimensions();
    const navigation = useAppNavigation();

    const animatedHeight = useState(new Animated.Value(60))[0];

    const sidebarHeight = height || 400;

    useEffect(() => {
        const handleResize = () => {
            const wideScreen = width > 1000;
            setIsExpanded(wideScreen);
            Animated.spring(animatedHeight, {
                toValue: wideScreen ? sidebarHeight : 60,
                useNativeDriver: false
            }).start();
        };

        handleResize();

        const subscription = Dimensions.addEventListener(
            "change",
            handleResize
        );

        return () => {
            subscription.remove();
        };
    }, [width, sidebarHeight]);

    const toggleSidebar = () => {
        const newIsExpanded = !isExpanded;
        setIsExpanded(newIsExpanded);

        Animated.spring(animatedHeight, {
            toValue: newIsExpanded ? sidebarHeight : 60,
            useNativeDriver: false
        }).start();
    };

    const routes = [
        { key: "live", icon: "video" },
        { key: "headphones", icon: "headphones" },
        { key: "add-person", icon: "user-plus" },
        { key: "logout", icon: "log-out" }
    ];

    async function handleSignOut() {
        try {
            await signOut(auth);
            navigation.navigate("Login");
        } catch (error) {
            console.error("Erro ao desconectar: ", error);
        }
    }

    return (
        <View style={styles.sidebarWrapper}>
            <Animated.View
                style={[
                    styles.sidebar,
                    {
                        height: animatedHeight,
                        backgroundColor
                    }
                ]}
            >
                <TouchableOpacity
                    style={styles.hamburger}
                    onPress={toggleSidebar}
                >
                    <Feather
                        name={isExpanded ? "x" : "menu"}
                        size={24}
                        color="#FFF"
                    />
                </TouchableOpacity>

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: animatedHeight.interpolate({
                                inputRange: [60, sidebarHeight],
                                outputRange: [0, 1]
                            })
                        }
                    ]}
                >
                    <View style={styles.navItems}>
                        {routes.map((route) => (
                            <TouchableOpacity
                                key={route.key}
                                style={[
                                    styles.navItem,
                                    activeRoute === route.key &&
                                        styles.navItemActive
                                ]}
                                onPress={() => {
                                    if (route.key === "logout") {
                                        handleSignOut().then(() =>
                                            navigation.navigate("Login")
                                        );
                                    }
                                    if (route.key === "live")
                                        navigation.navigate("LiveMonitoring");
                                    if (route.key === "add-person")
                                        navigation.navigate("Signup");
                                    if (route.key === "headphones")
                                        navigation.navigate("VideoCall");
                                }}
                            >
                                <View
                                    style={[
                                        styles.iconContainer,
                                        activeRoute === route.key &&
                                            styles.activeIconContainer
                                    ]}
                                >
                                    <Feather
                                        name={route.icon as any}
                                        size={24}
                                        color={
                                            activeRoute === route.key
                                                ? backgroundColor
                                                : "#FFF"
                                        }
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebarWrapper: {
        position: "absolute",
        left: 20,
        bottom: 20,
        zIndex: 1000
    },
    sidebar: {
        width: 60,
        borderRadius: 30,
        overflow: "hidden",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65
    },
    hamburger: {
        padding: 18,
        alignItems: "center",
        zIndex: 2 // Garante que o botão fique acima dos outros elementos
    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 10 // Adiciona um espaço na parte inferior
    },
    navItems: {
        alignItems: "center",
        width: "100%"
    },
    navItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        width: "100%"
    },
    navItemActive: {
        backgroundColor: "rgba(255, 255, 255)"
    },
    iconContainer: {
        borderRadius: 20,
        padding: 8
    },
    activeIconContainer: {
        backgroundColor: "#FFFFFF"
    }
});
