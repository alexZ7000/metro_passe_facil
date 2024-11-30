import metroLogo from "@assets/metro-logo.png";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ViewStyle,
    useWindowDimensions
} from "react-native";

interface HeaderProps {
    title: string;
    icon: keyof typeof Feather.glyphMap;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
    title,
    icon,
    backgroundColor = "#9164cc",
    textColor = "white",
    style
}) => {
    const { width } = useWindowDimensions();
    const isWideScreen = width > 1000;

    return (
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View style={[styles.header, { backgroundColor }, style]}>
                <View style={styles.headerTitleContainer}>
                    <Feather name={icon} size={40} color={textColor} />
                    <View style={styles.headerSeparator} />
                    <Text style={[styles.headerTitle, { color: textColor }]}>
                        {title}
                    </Text>
                </View>
                {isWideScreen && (
                    <Image
                        source={metroLogo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        right: 0,
        top: "5%",
        zIndex: 1
    },
    headerTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerSeparator: {
        width: 10,
        height: 55,
        backgroundColor: "white",
        marginHorizontal: 16
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500"
    },
    logo: {
        alignSelf: "flex-end",
        width: 50,
        height: 50,
        marginBottom: 10
    }
});

export default Header;
