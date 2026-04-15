import { StyleSheet, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  return <Redirect href="/(auth)/welcome" />;
};

export default index;

const styles = StyleSheet.create({});
