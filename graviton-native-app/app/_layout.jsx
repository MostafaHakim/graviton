import { Platform } from "react-native";
import {} from "expo-font";
import "../global.css";
import { Stack } from "expo-router";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { loadUser } from "../store/auth/authSlice";

if (Platform.OS === "web") {
  if (typeof setImmediate === "undefined") {
    global.setImmediate = (fn) => setTimeout(fn, 0);
    global.clearImmediate = (id) => clearTimeout(id);
  }
}

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return children;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppInitializer>
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
      </AppInitializer>
    </Provider>
  );
}

