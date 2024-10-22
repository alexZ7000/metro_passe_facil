import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    buttonColor: string;
}

export default function CustomButton({
    onPress,
    title,
    buttonColor
}: CustomButtonProps) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: buttonColor,
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center"
            }}
            onPress={onPress}
        >
            <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
        </TouchableOpacity>
    );
}
