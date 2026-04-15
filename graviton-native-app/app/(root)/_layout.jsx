import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ title: "Tabs", headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Tabs", headerShown: false }}
      />
      <Stack.Screen
        name="screen"
        options={{ title: "Tabs", headerShown: false }}
      />
    </Stack>
  );
}
