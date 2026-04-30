import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="AdmissionForm"
        options={{ title: "Tabs", headerShown: false }}
      />
      <Stack.Screen
        name="dashboard"
        options={{ title: "Dashboard", headerShown: false }}
      />
    </Stack>
  );
}
