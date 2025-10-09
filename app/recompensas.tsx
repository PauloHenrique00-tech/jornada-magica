import { StyleSheet, Text, View } from "react-native";

export default function RecompensasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Recompensas</Text>
      <Text>Ganhe estrelinhas ao completar rotinas!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff3e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
  },
});
