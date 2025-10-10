import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export default function ParabensAnimado() {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale }], opacity }]}
    >
      <Text style={styles.estrela}>⭐</Text>
      <Text style={styles.titulo}>Parabéns!</Text>
      <Text style={styles.texto}>Você ganhou uma estrela!</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  estrela: {
    fontSize: 90,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6a0dad",
    marginTop: 10,
  },
  texto: {
    fontSize: 18,
    color: "#333",
    marginTop: 6,
  },
});
