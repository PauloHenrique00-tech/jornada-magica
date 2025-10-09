// assets/componente/TaskItem.tsx  (ou components/TaskItem.tsx se você já moveu)

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// --- PASSO 1: Definir o "contrato" das propriedades ---
// Estamos criando um tipo que descreve exatamente o que o TaskItem espera receber.
type TaskItemProps = {
  title: string;
  points: number;
  onComplete: (points: number) => void; // A função onComplete deve receber os pontos como argumento
};

// --- PASSO 2: Aplicar o contrato ao componente ---
// Usamos React.FC<TaskItemProps> para dizer que este é um Componente Funcional
// do React e que suas props devem seguir o formato de TaskItemProps.
const TaskItem: React.FC<TaskItemProps> = ({ title, points, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePress = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      onComplete(points); // Passamos os pontos de volta para a tela principal
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isCompleted ? styles.completedContainer : {}]}
      onPress={handlePress}
      disabled={isCompleted}
    >
      <Text style={[styles.title, isCompleted ? styles.completedTitle : {}]}>
        {title}
      </Text>
      {!isCompleted && (
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>+{points} ⭐</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  completedContainer: {
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 18,
    color: "#333",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#A0A0A0",
  },
  pointsContainer: {
    backgroundColor: "#FFFBEA",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D4AF37",
  },
});

export default TaskItem;
