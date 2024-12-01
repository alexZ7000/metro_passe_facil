import Navbar from "@components/nav/Navbar";
import Sidebar from "@components/nav/Sidebar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigationState } from "@react-navigation/native";
import LiveMonitoring from "@screens/LiveMonitoring";
import Signup from "@screens/Signup";
import VideoCall from "@screens/VideoCall";
import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function SidebarNavRoutes() {
    const routeName = useNavigationState((state) => {
        let route = state.routes[state.index];
        while (route.state && route.state.index !== undefined) {
            route = route.state.routes[route.state.index] as any;
        }
        return route.name;
    });

    return (
        <View style={styles.container}>
            <Navbar activeRoute={routeName} />
            <Tab.Navigator
                initialRouteName="LiveMonitoring"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: "#555",
                    tabBarStyle: { display: "none" }
                }}
            >
                <Tab.Screen name="VideoCall" component={VideoCall} />
                <Tab.Screen name="LiveMonitoring" component={LiveMonitoring} />
                <Tab.Screen name="Signup" component={Signup} />
            </Tab.Navigator>
            <Sidebar height={400} activeRoute={routeName} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
