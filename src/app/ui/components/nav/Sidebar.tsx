import { Feather } from "@expo/vector-icons";
import useAppNavigation from "@functions/useAppNavigation";
import { auth } from "@modules/api";
import { useNavigationState } from "@react-navigation/native";
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
    height?: number;
    activeRoute: string;
}

export default function Sidebar({ height, activeRoute }: SidebarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { width } = useWindowDimensions();
    const navigation = useAppNavigation();

    const animatedHeight = useState(new Animated.Value(60))[0];
    const sidebarHeight = height || 400;

    const routeName = useNavigationState((state) => {
        let route = state.routes[state.index];
        while (route.state && route.state.index !== undefined) {
            route = route.state.routes[route.state.index] as any;
        }
        return route.name;
    });

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

    const screenColors: Record<string, string> = {
        LiveMonitoring: "#179330",
        VideoCall: "#f7b731",
        Signup: "#9164cc"
    };

    const backgroundColor = screenColors[activeRoute] || "#179330";

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
                    { height: animatedHeight, backgroundColor }
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
                        {[
                            "VideoCall",
                            "LiveMonitoring",
                            "Signup",
                            "Logout"
                        ].map((route) => (
                            <TouchableOpacity
                                key={route}
                                style={[
                                    styles.navItem,
                                    routeName === route && styles.navItemActive
                                ]}
                                onPress={() => {
                                    if (route === "Logout") {
                                        handleSignOut().then(() =>
                                            navigation.navigate("Login")
                                        );
                                    } else {
                                        navigation.navigate(route);
                                    }
                                }}
                            >
                                <View
                                    style={[
                                        styles.iconContainer,
                                        routeName === route &&
                                            styles.activeIconContainer
                                    ]}
                                >
                                    <Feather
                                        name={
                                            route === "VideoCall"
                                                ? "headphones"
                                                : route === "LiveMonitoring"
                                                  ? "video"
                                                  : route === "Signup"
                                                    ? "user"
                                                    : "log-out"
                                        }
                                        size={24}
                                        color={
                                            routeName === route
                                                ? "#000"
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
        zIndex: 2
    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 10
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
