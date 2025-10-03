import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecompensas } from "../context/RecompensasContext";

const tarefasIniciais = [
  { id: 1, titulo: "Escovar os dentes", concluida: false },
  { id: 2, titulo: "Arrumar a cama", concluida: false },
  { id: 3, titulo: "Guardar brinquedos", concluida: false },
];

export default function RotinasScreen() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const { adicionarEstrela } = useRecompensas();

  const toggleTarefa = (id: number) => {
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id && !t.concluida ? { ...t, concluida: true } : t
      )
    );

    // Sempre que concluir uma tarefa pela 1ª vez → ganha estrela
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa && !tarefa.concluida) {
      adicionarEstrela();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Minhas Rotinas</Text>
      {tarefas.map((tarefa) => (
        <TouchableOpacity
          key={tarefa.id}
          style={[styles.item, tarefa.concluida && styles.itemDone]}
          onPress={() => toggleTarefa(tarefa.id)}
        >
          <Text style={styles.text}>
            {tarefa.concluida ? "✅ " : "⬜ "} {tarefa.titulo}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f7ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007acc",
  },
  itemDone: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
  },
  text: {
    fontSize: 18,
  },
});
