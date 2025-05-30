import userDataStore from "@/app/mainStores/userStore/UserStore";
import { BASE_WIDTH } from "@/constants/Values";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReportIcon from "./reportIcon";
import { Colors } from "@/constants/Colors";
import { verticalCenter } from "@/constants/styleUtils";
import { router } from "expo-router";

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    reportContainer: {
      height: aspectRatio * 70,
      marginBottom: 20,
      ...verticalCenter,
    },
    reportsTitle: {
      color: "white",
      fontSize: 15,
      marginBottom: 20,
    },
    reportItemTitle: {
      fontSize: aspectRatio * 15,
      color: "white",
      fontWeight: 500,
    },
    splitterInfo: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      paddingTop: 10,
    },
    splitterName: {
      marginRight: aspectRatio * 10,
      color: Colors.gray,
      fontWeight: 300,
    },
    splitterTitle: {
      fontWeight: 300,
      marginRight: 15,
      color: Colors.gray,
    },
    informationContainer: {
      marginLeft: aspectRatio * 10,
      display: "flex",
      paddingTop: 10,
      height: "100%",
    },
  });
}

export default function ReportsContent() {
  const { userData } = userDataStore();
  const reports = userData?.reports;
  const styles = useStyles();

  const redirectToReport = (reportId: string) => {
    router.replace({
      pathname: "/reportEdit/[reportId]",
      params: { reportId },
    });
  };

  return (
    <View>
      <Text style={styles.reportsTitle}>Tus reportes:</Text>
      {reports?.map((report) => (
        <TouchableOpacity
          key={report.id}
          style={styles.reportContainer}
          onPress={() => redirectToReport(report.id)}
        >
          <ReportIcon type={report.type} />
          <View style={styles.informationContainer}>
            <Text style={styles.reportItemTitle}>{report.name}</Text>
            <View style={styles.splitterInfo}>
              <Text style={styles.splitterTitle}>Splitters: </Text>
              {report.users.map((user) => (
                <Text style={styles.splitterName} key={user.name}>
                  {user.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
