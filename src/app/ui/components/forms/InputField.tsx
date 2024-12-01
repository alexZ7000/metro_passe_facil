import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    style,
    error,
    ...props
}) => {
    return (
        //     <TextInput
        //         style={[
        //             styles.input,
        //             style,
        //             error && styles.inputError
        //         ]}
        //         placeholderTextColor="#666"
        //         {...props}
        //     />
        <></>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        fontSize: 16
    },
    inputError: {
        borderColor: "#ff4444"
    }
});
