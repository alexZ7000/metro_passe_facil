import { auth } from "@modules/api";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

export default async function loginOrRegisterUser(
    email: string,
    password: string
) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return { user: userCredential.user, isNewUser: true };
    } catch (registerError: any) {
        if (registerError.code === "auth/email-already-in-use") {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                return { user: userCredential.user, isNewUser: false };
            } catch (loginError: any) {
                console.error("Erro ao fazer login:", loginError.message);
                throw loginError;
            }
        } else {
            console.error("Erro ao registrar:", registerError.message);
            throw registerError;
        }
    }
}
