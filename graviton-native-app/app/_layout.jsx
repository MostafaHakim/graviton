import { Platform } from "react-native";
import {} from "expo-font";
import "../global.css";
import { Stack } from "expo-router";

if (Platform.OS === "web") {
  if (typeof setImmediate === "undefined") {
    global.setImmediate = (fn) => setTimeout(fn, 0);
    global.clearImmediate = (id) => clearTimeout(id);
  }
}

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "New Stake", headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ title: "Auth", headerShown: false }}
      />
      <Stack.Screen
        name="(root)"
        options={{ title: "Auth", headerShown: false }}
      />
    </Stack>
  );
}
