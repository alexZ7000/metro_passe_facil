import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@screens/Login";

const AuthStack = createNativeStackNavigator();

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
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}
