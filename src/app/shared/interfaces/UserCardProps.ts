import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";

export default interface UserCardProps {
    name: string;
    birthDate: string;
    cpf: string;
    gratuityType: string;
    img: AvatarImageSource;
}
