// Local: app/index.tsx ou App.js

import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TaskItem from "../components/TaskItem.tsx"; // Ajuste o caminho se necessário

// --- Dados de Exemplo ---
// No futuro, isso pode vir de um banco de dados ou configuração do usuário.
const TAREFAS_INICIAIS = [
  { id: "1", title: "Escovar os dentes", points: 10, completed: false },
  { id: "2", title: "Arrumar a cama", points: 15, completed: false },
  { id: "3", title: "Tomar café da manhã", points: 10, completed: false },
  { id: "4", title: "Guardar os brinquedos", points: 20, completed: false },
];
// -------------------------

// --- Tipos para o TypeScript (Opcional, mas recomendado) ---
interface Tarefa {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}
// -------------------------------------------------------------

export default function TelaPrincipal() {
  const [pontosMagicos, setPontosMagicos] = useState(0);
  const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS_INICIAIS);

  // Esta função será chamada pelo componente TaskItem
  const handleCompleteTask = (tarefaId: string, pontosGanhos: number) => {
    // 1. Adiciona os pontos
    setPontosMagicos((pontosAtuais) => pontosAtuais + pontosGanhos);

    // 2. Marca a tarefa como completa na lista
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === tarefaId ? { ...tarefa, completed: true } : tarefa
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Cabeçalho com o Título e os Pontos */}
      <View style={styles.header}>
        <Text style={styles.title}>Jornada Mágica</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{pontosMagicos}</Text>
          <Text style={styles.starIcon}>⭐</Text>
        </View>
      </View>

      {/* Legenda para a lista */}
      <Text style={styles.subtitle}>Missões de Hoje</Text>

      {/* Lista de Tarefas */}
      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            points={item.points}
            // Passamos uma função que já sabe qual tarefa e quantos pontos adicionar
            onComplete={() => handleCompleteTask(item.id, item.points)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA", // Um fundo suave, quase branco
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
  },
  starIcon: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495E",
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
