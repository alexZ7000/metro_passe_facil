declare module "@react-native-ml-kit/text-recognition" {
    const TextRecognition: {
        recognize: (uri: string) => Promise<{ text: string }[]>;
    };
    export default TextRecognition;
}

declare module "@react-native-firebase/ml-vision" {
    interface FaceDetectorResult {
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

    interface MLVision {
        faceDetectorProcessImage: (uri: string) => Promise<FaceDetectorResult>;
    }

    interface Firebase {
        ml: () => MLVision;
        app: () => any;
    }

    export const firebase: Firebase;
}

declare module "@vision-camera/face-detector" {
    interface FaceDetectorResult {
        faces: {
            bounds: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            landmarks: {
                [key: string]: {
                    x: number;
                    y: number;
                };
            };
            id?: number;
            probability?: number;
        }[];
    }

    export function detectFaces(image: string): Promise<FaceDetectorResult>;
}
