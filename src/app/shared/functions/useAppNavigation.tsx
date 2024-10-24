import IAppRoutes from "@interfaces/IAppRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * Custom hook to centralize the navigation logic.
 *
 * This hook simplifies access to the `useNavigation` function and returns
 * the navigation object typed with `IAppRoutes`.
 *
 * @returns {NavigationProp<IAppRoutes>} - The navigation object typed with the routes interface.
 *
 * @example
 * const navigation = useAppNavigation();
 * navigation.navigate("SomeOtherScreen");
 */
export default function useAppNavigation(): NavigationProp<IAppRoutes> {
    return useNavigation<NavigationProp<IAppRoutes>>();
}
