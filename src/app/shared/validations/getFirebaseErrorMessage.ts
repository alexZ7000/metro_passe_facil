export default function getFirebaseErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        "auth/email-already-in-use":
            "Este e-mail já está cadastrado. Faça login ou utilize outro e-mail.",
        "auth/invalid-email":
            "O e-mail inserido não é válido. Por favor, verifique e tente novamente.",
        "auth/user-disabled":
            "Esta conta foi desativada. Entre em contato com o suporte para mais informações.",
        "auth/user-not-found":
            "Usuário não encontrado. Verifique as credenciais ou cadastre-se.",
        "auth/wrong-password": "Senha incorreta. Por favor, tente novamente.",
        "auth/weak-password":
            "A senha deve ter no mínimo 6 caracteres. Escolha uma senha mais forte.",
        "auth/network-request-failed":
            "Falha na conexão com a rede. Verifique sua internet e tente novamente.",
        "auth/too-many-requests":
            "Muitas tentativas de login. Por favor, aguarde e tente novamente mais tarde.",
        "auth/internal-error":
            "Ocorreu um erro interno. Tente novamente mais tarde."
    };

    return (
        errorMessages[errorCode] ||
        "Ocorreu um erro inesperado. Tente novamente mais tarde."
    );
}
