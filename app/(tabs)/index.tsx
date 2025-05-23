import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import userDataStore from "../mainStores/userStore/UserStore";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useEffect } from "react";
import userAuthStore from "../login/store/AuthStore";
import ReportsMain from "../../ComponentsUI/reports/reportsMain";
import UserHeaderInformation from "@/ComponentsUI/headerInformation/userHeaderInformation";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = userAuthStore();
  const { fetchData, saveData, loading } = userDataStore();

  useEffect(() => {
    if (user) {
      fetchData(user?.id);
    }
  }, []);

  useEffect(() => {
    //console.log(data);
  }, [loading]);

  return loading ? (
    <ActivityIndicator
      style={styles.loader}
      animating={true}
      size="large"
      color={MD2Colors.red800}
    />
  ) : (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <UserHeaderInformation />
      </View>
      <View>
        <ReportsMain />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    paddingTop: 10,
    color: "white",
    fontSize: 20,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 15,
  },
});
