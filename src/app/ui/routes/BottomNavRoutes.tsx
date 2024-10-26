import BottomNavbar from "@components/nav/BottomNavbar";
import Navbar from "@components/nav/Navbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiveMonitoring from "@screens/LiveMonitoring";
import Teste from "@screens/Teste";

const Tab = createBottomTabNavigator();

export default function BottomNavRoutes() {
    return (
        <>
            <Navbar />

            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: "#555",
                    tabBarStyle: { backgroundColor: "#00008B", display: "none" }
                }}
            >
                <Tab.Screen name="LiveMonitoring" component={LiveMonitoring} />
                <Tab.Screen name="Teste" component={Teste} />
            </Tab.Navigator>
            <BottomNavbar />
        </>
    );
}
