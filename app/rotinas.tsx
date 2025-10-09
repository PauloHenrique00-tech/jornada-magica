import { StyleSheet, Text, View } from "react-native";

export default function RotinasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Minhas Rotinas</Text>
      <Text>Aqui você verá as atividades do dia!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 10,
  },
});
