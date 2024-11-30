import { auth } from "@modules/api";
import getFirebaseErrorMessage from "@shared/validations/getFirebaseErrorMessage";
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
                const friendlyMessage = getFirebaseErrorMessage(
                    loginError.code
                );
                throw new Error(friendlyMessage);
            }
        } else {
            const friendlyMessage = getFirebaseErrorMessage(registerError.code);
            throw new Error(friendlyMessage);
        }
    }
}
