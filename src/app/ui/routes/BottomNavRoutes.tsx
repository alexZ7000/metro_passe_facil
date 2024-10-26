import BottomNavbar from "@components/nav/BottomNavbar";
import Navbar from "@components/nav/Navbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiveMonitoring from "@screens/LiveMonitoring";
import Signup from "@screens/Signup";
import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomNavRoutes() {
    return (
        <View style={styles.container}>
            <Navbar />
            <Tab.Navigator
                initialRouteName="LiveMonitoring"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: "#555",
                    tabBarStyle: { display: "none" }
                }}
            >
                <Tab.Screen name="LiveMonitoring" component={LiveMonitoring} />
                <Tab.Screen name="Signup" component={Signup} />
            </Tab.Navigator>
            <BottomNavbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
