import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import ParabensAnimado from "../assets/components/ParabensAnimado";

export default function ParabensScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ParabensAnimado />

      <View style={styles.botaoContainer}>
        <Button
          title="Voltar às Rotinas"
          color="#6a0dad"
          onPress={() => router.push("/(tabs)/rotinas")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  botaoContainer: {
    marginTop: 30,
    width: "60%",
  },
});
