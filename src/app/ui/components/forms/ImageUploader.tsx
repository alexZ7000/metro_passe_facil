import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface ImageUploaderProps {
    imageUri: string | null;
    onUpload: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    imageUri,
    onUpload
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onUpload}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <IconButton icon="camera" size={40} iconColor="#9164cc" />
                    <Text style={styles.text}>Adicionar Foto</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e0e0e0"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    placeholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#9164cc",
        fontSize: 16,
        marginTop: 8
    }
});
