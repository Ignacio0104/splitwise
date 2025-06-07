import { Report } from "@/app/store/storeModels";
import { Colors } from "@/constants/Colors";
import { BASE_WIDTH } from "@/constants/Values";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface BarChartProps {
  report: Report;
}

const useStyles = () => {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;
  return StyleSheet.create({
    chartBackground: {
      height: aspectRatio * 200,
      width: "90%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "flex-end",
    },
    barStyle: {
      width: 20,
      backgroundColor: Colors.highlightColor,
    },
  });
};

export default function BarChart(props: BarChartProps) {
  const styles = useStyles();

  const animatedBarHeights = useRef(
    props.report.users.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const maxPercentage = Math.max(
      ...props.report.users.map((user) => user.fixedPercentage || 0)
    );

    if (maxPercentage === 0) {
      animatedBarHeights.forEach((val) => val.setValue(0));
      return;
    }
    const animations = props.report.users.map((user, index) => {
      const totalHeight = styles.chartBackground.height;

      const normalizedHeight =
        ((user.fixedPercentage ?? 0) / maxPercentage) * totalHeight;

      return Animated.timing(animatedBarHeights[index], {
        toValue: normalizedHeight,
        duration: 800,
        useNativeDriver: false,
      });
    });
    setTimeout(() => {
      Animated.parallel(animations).start();
    }, 500);
  }, [props.report.users]);

  return (
    <View style={styles.chartBackground}>
      {props.report.users.map((_, index) => (
        <View key={index}>
          <Animated.View
            style={[
              styles.barStyle,
              {
                height: animatedBarHeights[index],
              },
            ]}
          />
          <View>
            <Text style={{ color: "white" }}>Prueba</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
