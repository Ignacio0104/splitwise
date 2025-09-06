import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreationScreen() {
  const insets = useSafeAreaInsets();

  return <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
