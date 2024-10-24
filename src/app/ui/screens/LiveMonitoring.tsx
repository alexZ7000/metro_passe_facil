import BottomNavBar from "@components/nav/BottomNavbar";
import Navbar from "@components/nav/Navbar";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";

export default function LiveMonitoring() {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: "camera1", icon: "camera" },
        { key: "camera2", icon: "camera" }
    ];

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.innerContainer}>
                {routes.map((route, idx) => (
                    <View style={styles.blueBox} key={route.key}>
                        <PaperIconButton
                            icon={route.icon}
                            iconColor="#fff"
                            size={30}
                            onPress={() => setIndex(idx)}
                        />
                    </View>
                ))}
            </View>
            <BottomNavBar index={index} setIndex={setIndex} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF0F4"
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    blueBox: {
        backgroundColor: "#011689",
        width: "90%",
        height: 120,
        borderRadius: 35,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    }
});
