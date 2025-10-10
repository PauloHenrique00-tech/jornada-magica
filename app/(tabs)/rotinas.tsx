import { useRecompensas } from "@/context/RecompensasContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const tarefasIniciais = [
  { id: 1, nome: "Escovar os dentes", concluida: false },
  { id: 2, nome: "Arrumar a cama", concluida: false },
  { id: 3, nome: "Guardar os brinquedos", concluida: false },
];

export default function RotinasScreen() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const { adicionarEstrela } = useRecompensas();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [novaTarefaNome, setNovaTarefaNome] = useState("");

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

  const handleAdicionarTarefa = () => {
    if (novaTarefaNome.trim() === "") return;
    const novaTarefa = {
      id: Date.now(),
      nome: novaTarefaNome,
      concluida: false,
    };
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
    setNovaTarefaNome("");
    setModalVisible(false);
  };

  // ADICIONADO: Função para remover a tarefa
  const handleRemoverTarefa = (id: number) => {
    // Um alerta para evitar remoções acidentais, muito bom para usabilidade!
    Alert.alert(
      "Remover Tarefa",
      "Você tem certeza que deseja remover esta tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim, remover",
          onPress: () => {
            setTarefas((tarefasAtuais) =>
              tarefasAtuais.filter((tarefa) => tarefa.id !== id)
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* O Modal continua o mesmo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Criar Nova Tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da tarefa..."
              value={novaTarefaNome}
              onChangeText={setNovaTarefaNome}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancelar"
                color="#FF6347"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Adicionar" onPress={handleAdicionarTarefa} />
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>📋 Minhas Rotinas</Text>
      <Text style={styles.subtitle}>Escolha uma tarefa para completar!</Text>

      {tarefas.map((tarefa) => (
        // ALTERADO: A view principal da tarefa agora tem o layout de linha
        <View
          key={tarefa.id}
          style={[
            styles.tarefaContainer,
            tarefa.concluida && { backgroundColor: "#c8e6c9" },
          ]}
        >
          {/* O TouchableOpacity agora envolve apenas o texto, para ser clicável */}
          <TouchableOpacity
            style={styles.tarefaClickable}
            onPress={() => toggleTarefa(tarefa.id)}
          >
            <Text style={styles.tarefaTexto}>
              {tarefa.concluida ? "✅ " : "⬜ "} {tarefa.nome}
            </Text>
          </TouchableOpacity>

          {/* ADICIONADO: Botão para remover a tarefa */}
          <TouchableOpacity onPress={() => handleRemoverTarefa(tarefa.id)}>
            <Text style={styles.removerIcone}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* O botão flutuante continua o mesmo */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// ALTERADO: Estilos atualizados para acomodar o botão de remover
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Aumentado para dar mais espaço no topo
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
  // ALTERADO: Antigo estilo 'tarefa' agora é 'tarefaContainer'
  tarefaContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 6,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row", // Itens ficam lado a lado
    alignItems: "center",
    justifyContent: "space-between", // Espaço entre o texto e o ícone
  },
  // ADICIONADO: Estilo para a área clicável da tarefa
  tarefaClickable: {
    flex: 1, // Faz o texto ocupar todo o espaço disponível
  },
  tarefaTexto: {
    fontSize: 18,
  },
  // ADICIONADO: Estilo para o ícone de remover
  removerIcone: {
    fontSize: 22,
    marginLeft: 10, // Pequeno espaço entre o texto e o ícone
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#007acc",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
