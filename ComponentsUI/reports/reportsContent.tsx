import userDataStore from "@/app/mainStores/userStore/UserStore";
import { BASE_WIDTH } from "@/constants/Values";
import React, { useEffect } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReportIcon from "./reportIcon";
import { Colors } from "@/constants/Colors";
import { verticalCenter } from "@/constants/styleUtils";

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    reportContainer: {
      height: aspectRatio * 70,
      backgroundColor: Colors.darkColorSecondary,
      marginBottom: 20,
      ...verticalCenter,
      borderRadius: 10,
    },
    fontStyleWhite: {
      color: "white",
      fontSize: 15,
      marginBottom: 20,
    },
  });
}

export default function ReportsContent() {
  const { userData } = userDataStore();
  const reports = userData?.reports;
  const styles = useStyles();

  return (
    <View>
      <Text style={styles.fontStyleWhite}>Tus reportes:</Text>
      {reports?.map((report) => (
        <View key={report.id} style={styles.reportContainer}>
          <ReportIcon type={report.type} />
          <Text style={styles.fontStyleWhite}>{report.type}</Text>
        </View>
      ))}
    </View>
  );
}
