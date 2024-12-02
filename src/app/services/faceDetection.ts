import { firebase } from "@react-native-firebase/ml-vision";
import { Platform } from "react-native";

import { app } from "../config/firebase";

export interface FaceDetectionResult {
    faces: {
        bounds: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        landmarks?: {
            [key: string]: {
                x: number;
                y: number;
            };
        };
        id?: number;
        probability?: number;
    }[];
}

interface FaceDetectionResponse {
    faces: {
        boundingBox: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
        landmarks: {
            [key: string]: {
                x: number;
                y: number;
            };
        };
        trackingId?: number;
        probability?: number;
    }[];
}

export async function detectFace(
    imageUri: string
): Promise<FaceDetectionResult> {
    try {
        if (Platform.OS === "web") {
            // Usando Firebase Web SDK
            const mlInstance = firebase.ml();
            const result = (await mlInstance.faceDetectorProcessImage(
                imageUri
            )) as FaceDetectionResponse;

            return {
                faces: result.faces.map((face) => ({
                    bounds: {
                        x: face.boundingBox.left,
                        y: face.boundingBox.top,
                        width: face.boundingBox.right - face.boundingBox.left,
                        height: face.boundingBox.bottom - face.boundingBox.top
                    },
                    landmarks: face.landmarks,
                    id: face.trackingId,
                    probability: face.probability
                }))
            };
        } else {
            // Usando React Native Firebase ML Kit
            const result = await firebase
                .ml()
                .faceDetectorProcessImage(imageUri);
            return {
                faces: result.faces.map((face) => ({
                    bounds: {
                        x: face.boundingBox.left,
                        y: face.boundingBox.top,
                        width: face.boundingBox.right - face.boundingBox.left,
                        height: face.boundingBox.bottom - face.boundingBox.top
                    },
                    landmarks: face.landmarks,
                    id: face.trackingId,
                    probability: face.probability
                }))
            };
        }
    } catch (error) {
        console.error("Erro na detecção facial:", error);
        return { faces: [] };
    }
}
