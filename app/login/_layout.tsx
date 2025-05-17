import React from "react";
import Login from "./index";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function LoginLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
