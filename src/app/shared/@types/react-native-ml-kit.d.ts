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
