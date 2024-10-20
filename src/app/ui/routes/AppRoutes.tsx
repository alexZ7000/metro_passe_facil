import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";

const AuthStack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTitle: "",
                    headerShown: false
                }}
            >
                <AuthStack.Screen name="Home" component={Home} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}
