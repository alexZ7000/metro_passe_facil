import CameraNotAvailable from "@components/CameraNotAvailable";
import React from "react";
import { Platform } from "react-native";

export const withPlatformCheck = (
    WrappedComponent: React.ComponentType<any>
) => {
    return (props: any) => {
        if (Platform.OS === "web") {
            return <CameraNotAvailable />;
        }
        return <WrappedComponent {...props} />;
    };
};
