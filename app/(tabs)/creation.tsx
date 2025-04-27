import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreationScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <Text style={styles.logout}>Creation</Text>
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
