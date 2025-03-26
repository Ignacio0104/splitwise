import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import userAuthStore from "../login/store/AuthStore";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { logout } = userAuthStore();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <Text style={styles.logout}>Home</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logout: {
    color: "white",
    padding: 10,
  },
  container: {
    flex: 1,
  },
});
