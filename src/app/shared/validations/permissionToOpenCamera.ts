import * as ImagePicker from "expo-image-picker";

export default async function permissionToOpenCamera() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) return false;

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    });

    if (!result.canceled) return result.assets[0].uri;
    return false;
}
