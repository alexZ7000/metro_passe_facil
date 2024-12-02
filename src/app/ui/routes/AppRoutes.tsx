import IAppRoutes from "@interfaces/IAppRoutes";
import { auth } from "@modules/api";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SidebarNavRoutes from "@routes/SidebarNavRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import {
    Login,
    Signup,
    TextDetection,
    FaceDetection,
    FaceComparison
} from "../screens";

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
                screenOptions={{
                    headerShown: false
                }}
            >
                {user ? (
                    <>
                        <AuthStack.Screen
                            name="MainTabs"
                            component={SidebarNavRoutes}
                        />
                        <AuthStack.Screen
                            name="FaceDetection"
                            component={FaceDetection}
                        />
                        <AuthStack.Screen
                            name="FaceComparison"
                            component={FaceComparison}
                        />
                        <AuthStack.Screen
                            name="TextDetection"
                            component={TextDetection}
                        />
                    </>
                ) : (
                    <>
                        <AuthStack.Screen name="Login" component={Login} />
                        <AuthStack.Screen name="Signup" component={Signup} />
                    </>
                )}
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}
