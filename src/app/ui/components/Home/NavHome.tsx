import { Appbar } from "react-native-paper";

export default function NavHome() {
    return (
        <Appbar.Header>
            <Appbar.Content
                mode="center-aligned"
                titleStyle={{ textAlign: "center" }}
                title="Passe Fácil"
            />
        </Appbar.Header>
    );
}
