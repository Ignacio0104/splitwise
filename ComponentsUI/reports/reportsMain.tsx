import store from "@/app/store/mainStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import ReportsContent from "./reportsContent";
import ReportsEmpty from "./reportsEmpty";

export default function ReportsMain() {
  const { userData } = store();

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
