import { useRecompensas } from "@/context/RecompensasContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ADICIONADO: Interface para definir a estrutura da Tarefa
interface Tarefa {
  id: number;
  nome: string;
  concluida: boolean;
  status: "pendente" | "concluida" | "incentivo";
}

const TAREFAS_STORAGE_KEY = "@JornadaMagica:tarefas";

export default function RotinasScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const { adicionarEstrela } = useRecompensas();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [novaTarefaNome, setNovaTarefaNome] = useState("");

  // Os useEffects para carregar e salvar continuam os mesmos.
  useEffect(() => {
    const carregarTarefas = async () => {
      const tarefasSalvas = await AsyncStorage.getItem(TAREFAS_STORAGE_KEY);
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    };
    carregarTarefas();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(TAREFAS_STORAGE_KEY, JSON.stringify(tarefas));
  }, [tarefas]);

  // ALTERADO: A função toggleTarefa agora atualiza o status
  const toggleTarefa = (id: number) => {
    const tarefaAntesDoToggle = tarefas.find((t) => t.id === id);
    if (!tarefaAntesDoToggle) return;

    if (!tarefaAntesDoToggle.concluida) {
      adicionarEstrela();
      router.push("/parabens");
    }

    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) => {
        if (tarefa.id === id) {
          const novaConcluida = !tarefa.concluida;
          return {
            ...tarefa,
            concluida: novaConcluida,
            status: novaConcluida ? "concluida" : "pendente",
          };
        }
        return tarefa;
      })
    );
  };

  // ALTERADO: A função de adicionar agora inclui o status inicial
  const handleAdicionarTarefa = () => {
    if (novaTarefaNome.trim() === "") return;
    const novaTarefa: Tarefa = {
      id: Date.now(),
      nome: novaTarefaNome,
      concluida: false,
      status: "pendente", // Status inicial
    };
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
    setNovaTarefaNome("");
    setModalVisible(false);
  };

  const handleRemoverTarefa = (id: number) => {
    Alert.alert("Remover Tarefa", "Certeza que quer remover?", [
      { text: "Cancelar" },
      {
        text: "Sim",
        onPress: () => setTarefas(tarefas.filter((t) => t.id !== id)),
        style: "destructive",
      },
    ]);
  };

  // ADICIONADO: Função para finalizar o dia
  const handleFinalizarDia = () => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        !tarefa.concluida ? { ...tarefa, status: "incentivo" } : tarefa
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* O seu Modal para adicionar tarefa (sem alterações) */}
      <Modal /* ... */>{/* ... */}</Modal>

      <Text style={styles.title}>📋 Minhas Rotinas</Text>
      <Text style={styles.subtitle}>Escolha uma tarefa para completar!</Text>

      {tarefas.map((tarefa) => {
        const isIncentivo = tarefa.status === "incentivo";

        return (
          <View
            key={tarefa.id}
            // ALTERADO: O estilo de fundo agora é condicional
            style={[
              styles.tarefa, // Seu estilo original
              tarefa.concluida && { backgroundColor: "#c8e6c9" }, // Seu estilo de concluída
              isIncentivo && styles.tarefaIncentivo, // Novo estilo de incentivo
            ]}
          >
            <TouchableOpacity
              style={styles.tarefaClickable}
              onPress={() => toggleTarefa(tarefa.id)}
              disabled={isIncentivo} // Desabilita o clique no modo incentivo
            >
              <Text style={styles.tarefaTexto}>
                {/* ALTERADO: O ícone agora depende do status */}
                {tarefa.status === "concluida"
                  ? "✅ "
                  : isIncentivo
                  ? "✨ "
                  : "⬜ "}
                {tarefa.nome}
              </Text>
              {/* ADICIONADO: Mensagem de reforço que só aparece no modo incentivo */}
              {isIncentivo && (
                <Text style={styles.textoIncentivo}>
                  Tudo bem, amanhã é um novo dia para tentar!
                </Text>
              )}
            </TouchableOpacity>

            {/* O botão de remover só aparece se não for incentivo */}
            {!isIncentivo && (
              <TouchableOpacity onPress={() => handleRemoverTarefa(tarefa.id)}>
                <Text style={styles.removerIcone}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      {/* ADICIONADO: Botão para finalizar o dia */}
      <TouchableOpacity
        style={styles.botaoFinalizarDia}
        onPress={handleFinalizarDia}
      >
        <Text style={styles.botaoFinalizarDiaTexto}>Finalizar o Dia</Text>
      </TouchableOpacity>

      {/* Seu botão flutuante para adicionar tarefa (sem alterações) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// SEUS ESTILOS ORIGINAIS + AS NOVAS ADIÇÕES
const styles = StyleSheet.create({
  // --- Seus estilos originais (mantidos) ---
  container: {
    flexGrow: 1, // Usar flexGrow com ScrollView
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    padding: 20,
    paddingBottom: 100, // Espaço para os botões flutuantes
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
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 6,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tarefaTexto: {
    fontSize: 18,
  },
  tarefaClickable: {
    flex: 1,
  },
  removerIcone: {
    fontSize: 22,
    marginLeft: 10,
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
  // --- Estilos do Modal (mantidos) ---
  modalContainer: {
    /*...*/
  },
  modalView: {
    /*...*/
  },
  modalTitle: {
    /*...*/
  },
  input: {
    /*...*/
  },
  buttonContainer: {
    /*...*/
  },

  // --- NOVOS ESTILOS (adicionados sem alterar os anteriores) ---
  tarefaIncentivo: {
    backgroundColor: "#fff9c4", // Um amarelo claro e suave
    opacity: 0.8,
  },
  textoIncentivo: {
    fontSize: 14,
    color: "#795548", // Um tom de marrom suave
    marginTop: 5,
    paddingLeft: 34, // Alinha com o texto principal
  },
  botaoFinalizarDia: {
    marginTop: 20,
    backgroundColor: "#4CAF50", // Verde para ação positiva
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  botaoFinalizarDiaTexto: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
