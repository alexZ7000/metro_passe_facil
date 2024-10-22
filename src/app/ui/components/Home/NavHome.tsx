import * as React from "react";
import { Appbar } from "react-native-paper";

export default function NavHome() {
    const _goBack = () => console.log("Went back");

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
