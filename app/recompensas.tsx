import { StyleSheet, Text, View } from "react-native";
import { useRecompensas } from "../context/RecompensasContext";

export default function RecompensasScreen() {
  const { estrelas } = useRecompensas();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Recompensas</Text>
      <Text style={styles.sub}>Você já ganhou:</Text>
      <Text style={styles.stars}>⭐ {estrelas} estrelas</Text>
      <Text style={styles.note}>Complete rotinas para ganhar mais!</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
  },
  sub: {
    fontSize: 18,
    marginBottom: 5,
  },
  stars: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff9900",
    marginBottom: 10,
  },
  note: {
    fontSize: 16,
    color: "#555",
  },
});
