import IAppRoutes from "@interfaces/IAppRoutes";
import { auth } from "@modules/api";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavRoutes from "@routes/BottomNavRoutes";
import Login from "@screens/Login";
import Signup from "@screens/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const AuthStack = createNativeStackNavigator<IAppRoutes>();

export default function AppRoutes() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user as any);
        });
        return () => unsubscribe();
    }, []);

    return (
        <NavigationContainer>
            <AuthStack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitle: "",
                    headerShown: false
                }}
            >
                {user ? (
                    <AuthStack.Screen
                        name="MainTabs"
                        component={BottomNavRoutes}
                    />
                ) : (
                    <AuthStack.Screen name="Login" component={Login} />
                )}
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}
