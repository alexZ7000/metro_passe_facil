import { ComponentType } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAppRoutes } from "../interfaces/IAppRoutes";

export type ScreenProps<T extends keyof IAppRoutes> = NativeStackScreenProps<
    IAppRoutes,
    T
>;

export type FaceDetectionScreenComponent = ComponentType<
    ScreenProps<"FaceDetection">
>;
export type FaceComparisonScreenComponent = ComponentType<
    ScreenProps<"FaceComparison">
>;
