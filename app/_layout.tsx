import { Stack } from "expo-router";
import { RecompensasProvider } from "../context/RecompensasContext";

export default function RootLayout() {
  return (
    <RecompensasProvider>
      <Stack>
        {/* Abas principais */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modal de Parabéns */}
        <Stack.Screen
          name="parabens"
          options={{
            presentation: "modal",
            title: "Parabéns!",
          }}
        />
      </Stack>
    </RecompensasProvider>
  );
}
