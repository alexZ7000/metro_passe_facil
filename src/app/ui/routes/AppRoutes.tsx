import IAppRoutes from "@interfaces/IAppRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LiveMonitoring from "@screens/LiveMonitoring";
import Login from "@screens/Login";

const AuthStack = createNativeStackNavigator<IAppRoutes>();

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitle: "",
                    headerShown: false
                }}
            >
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen
                    name="LiveMonitoring"
                    component={LiveMonitoring}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}
