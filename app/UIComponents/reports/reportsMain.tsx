import userDataStore from "@/app/mainStores/userStore/UserStore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Button } from "react-native-paper";
import ReportsEmpty from "./reportsEmpty";

export default function ReportsMain() {
  const { userData } = userDataStore();

  return (
    <View style={styles.mainContainer}>
      {userData?.reports && userData?.reports?.length > 0 ? (
        <Text style={styles.fontStyleWhite}>Reportes</Text>
      ) : (
        <ReportsEmpty />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,
  },
  fontStyleWhite: {
    color: "white",
    fontSize: 15,
  },
});
