import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_WIDTH } from "@/constants/Values";
import ReportIcon from "@/ComponentsUI/reports/reportIcon";
import { center, verticalCenter } from "@/constants/styleUtils";
import BarChart from "@/ComponentsUI/charts/barChart";
import { Colors } from "@/constants/Colors";
import store from "../store/mainStore";
import { Report } from "../store/storeModels";

export function useStyles() {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    backArrowStyle: {
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "center",
      height: "auto",
      fontSize: 40,
    },
    editViewContainer: {
      display: "flex",
      height: "100%",
    },
    editHeaderContainer: {
      ...center,
      height: aspectRatio * 100,
      justifyContent: "space-around",
    },
    headerText: {
      fontSize: aspectRatio * 30,
      color: "white",
    },
    chartContainer: {
      ...center,
      marginTop: 30,
    },
    chartDivisionContainer: {
      ...center,
    },
    chartDivision: {
      height: 2,
      width: "90%",
      backgroundColor: Colors.lightColorPrimary,
      marginTop: 10,
    },
  });
}

export default function ReportEdit() {
  const { reportId } = useLocalSearchParams();
  const { getReportById } = store();
  const style = useStyles();

  const [reportInfo, setReportInfo] = useState<Report | undefined>(undefined);

  useEffect(() => {
    const report = getReportById((reportId as string) || "");
    setReportInfo(report);
  }, [reportId]);

  return (
    <SafeAreaView>
      <Appbar.Header style={style.backArrowStyle}>
        <Appbar.BackAction
          color="white"
          size={35}
          onPress={() => {
            router.replace("/");
          }}
        />
      </Appbar.Header>
      <View style={style.editViewContainer}>
        <View style={style.editHeaderContainer}>
          <ReportIcon type={reportInfo?.type || ""} isEditView={true} />
          <Text style={style.headerText}>{reportInfo?.name}</Text>
        </View>
        <View style={style.chartContainer}>
          {reportInfo && <BarChart report={reportInfo} />}
        </View>
        <View style={style.chartDivisionContainer}>
          <View style={style.chartDivision}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}
