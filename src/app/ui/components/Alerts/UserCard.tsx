import UserCardProps from "@interfaces/UserCardProps";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

export default function UserCard({
    gratuityType,
    cpf,
    birthDate,
    name,
    img
}: UserCardProps) {
    return (
        <Card style={styles.userCard}>
            <View style={styles.cardContent}>
                <Avatar.Image size={50} source={img} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.userText}>
                        <Text style={styles.bold}>Nome:</Text> {name}
                    </Text>
                    <Text style={styles.userText}>
                        <Text style={styles.bold}>Data de Nascimento:</Text>{" "}
                        {birthDate}
                    </Text>
                    <Text style={styles.userText}>
                        <Text style={styles.bold}>CPF:</Text> {cpf}
                    </Text>
                    <Text style={[styles.userText, styles.gratuity]}>
                        {gratuityType}
                    </Text>
                </View>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {}}
                >
                    Ver Mais
                </Button>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#F5F5F5"
    },
    userCard: {
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: "#FFEBEE",
        padding: 16
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        marginRight: 16
    },
    userInfo: {
        flex: 1
    },
    userText: {
        fontSize: 14,
        color: "#333"
    },
    bold: {
        fontWeight: "bold"
    },
    gratuity: {
        color: "#D32F2F"
    },
    button: {
        backgroundColor: "#D32F2F",
        marginLeft: 16
    }
});
