import { Stack, Tabs } from "expo-router";
import { RecompensasProvider } from "../context/RecompensasContext";

export default function Layout() {
  return (
    <RecompensasProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="parabens"
          options={{
            presentation: "modal",
            title: "Parabéns!",
          }}
        />
      </Stack>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#6a0dad" },
          headerTintColor: "#fff",
          tabBarActiveTintColor: "#6a0dad",
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Início" }} />
        <Tabs.Screen name="rotinas" options={{ title: "Rotinas" }} />
        <Tabs.Screen name="recompensas" options={{ title: "Recompensas" }} />
        <Tabs.Screen name="configuracoes" options={{ title: "Config." }} />
      </Tabs>
    </RecompensasProvider>
  );
}
