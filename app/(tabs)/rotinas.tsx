import { useRecompensas } from "@/context/RecompensasContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const tarefasIniciais = [
  { id: 1, nome: "Escovar os dentes", concluida: false },
  { id: 2, nome: "Arrumar a cama", concluida: false },
  { id: 3, nome: "Guardar os brinquedos", concluida: false },
];

export default function RotinasScreen() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const { adicionarEstrela } = useRecompensas();
  const router = useRouter();

  const toggleTarefa = (id: number) => {
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id && !t.concluida ? { ...t, concluida: true } : t
      )
    );

    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa && !tarefa.concluida) {
      adicionarEstrela();
      router.push("/parabens");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Minhas Rotinas</Text>
      <Text style={styles.subtitle}>Escolha uma tarefa para completar!</Text>

      {tarefas.map((tarefa) => (
        <TouchableOpacity
          key={tarefa.id}
          style={[
            styles.tarefa,
            tarefa.concluida && { backgroundColor: "#c8e6c9" },
          ]}
          onPress={() => toggleTarefa(tarefa.id)}
        >
          <Text style={styles.tarefaTexto}>
            {tarefa.concluida ? "✅ " : "⬜ "} {tarefa.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  tarefa: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tarefaTexto: {
    fontSize: 18,
  },
});
