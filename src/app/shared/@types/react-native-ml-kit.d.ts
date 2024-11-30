declare module "@react-native-ml-kit/text-recognition" {
    const TextRecognition: {
        recognize: (uri: string) => Promise<{ text: string }[]>;
    };
    export default TextRecognition;
}

declare module "@react-native-firebase/ml-vision" {
    export const firebase: any;
}
