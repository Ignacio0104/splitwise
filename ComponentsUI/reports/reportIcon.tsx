import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { BASE_WIDTH } from "@/constants/Values";
import { center } from "@/constants/styleUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    iconContainer: {
      height: "90%",
      width: "auto",
      ...center,
      paddingHorizontal: 10,
    },
  });
}

export interface ReportIconProps {
  type: string;
}

export default function ReportIcon(props: ReportIconProps) {
  const styles = useStyles();

  const getIcon = () => {
    switch (props.type) {
      case "household":
        return <Feather name="home" size={50} color="#277da1" />;
      case "dinner":
        return <Ionicons name="fast-food-outline" size={50} color="#b5179e" />;
      default:
        return <MaterialIcons name="attach-money" size={50} color="#006466" />;
    }
  };
  return <View style={styles.iconContainer}>{getIcon()}</View>;
}
