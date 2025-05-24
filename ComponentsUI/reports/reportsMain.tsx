import userDataStore from "@/app/mainStores/userStore/UserStore";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Button } from "react-native-paper";
import ReportsEmpty from "./reportsEmpty";
import ReportsContent from "./reportsContent";

export default function ReportsMain() {
  const { userData } = userDataStore();

  return (
    <View style={styles.mainContainer}>
      {userData?.reports && userData?.reports?.length > 0 ? (
        <ReportsContent />
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
});
