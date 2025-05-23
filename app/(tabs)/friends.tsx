import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      <View>
        <Text style={styles.tabTwo}>Friends</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tabTwo: {
    color: "white",
    padding: 10,
  },
});
