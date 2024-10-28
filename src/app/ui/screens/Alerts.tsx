import UserCard from "@components/Alerts/UserCard";
import { UserCardConstant } from "@shared/constants/UserCardConstant";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Alerts() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.alertContainer}>
                <Text style={styles.alertText}>⚠️ Usuário Irregular</Text>
            </View>
            {UserCardConstant.map((user, index) => (
                <UserCard key={index} {...user} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 104,
        backgroundColor: "#F5F5F5"
    },
    alertContainer: {
        backgroundColor: "#FFCDD2",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    alertText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#D32F2F"
    }
});
