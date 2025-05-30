import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { BASE_WIDTH } from "@/constants/Values";
import { center } from "@/constants/styleUtils";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function useStyles(editView = false) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    iconContainer: {
      height: editView ? "70%" : "90%",
      width: aspectRatio * 60,
      ...center,
      paddingHorizontal: 10,
      backgroundColor: Colors.darkColorSecondary,
      borderRadius: 20,
    },
  });
}

export interface ReportIconProps {
  type: string;
  isEditView?: boolean;
}

export default function ReportIcon(props: ReportIconProps) {
  const styles = useStyles(props.isEditView);

  const getIcon = () => {
    switch (props.type) {
      case "household":
        return (
          <Feather
            style={{ margin: "auto" }}
            name="home"
            size={45}
            color="#277da1"
          />
        );
      case "dinner":
        return <Ionicons name="fast-food-outline" size={45} color="#b5179e" />;
      case "trip":
        return (
          <MaterialCommunityIcons name="palm-tree" size={45} color="#80ed99" />
        );
      case "party":
        return (
          <MaterialCommunityIcons
            name="party-popper"
            size={45}
            color="#ee4266"
          />
        );
      case "shopping":
        return <FontAwesome name="shopping-basket" size={40} color="#9d4edd" />;
      default:
        return (
          <MaterialIcons
            style={{ paddingLeft: 2 }}
            name="attach-money"
            size={45}
            color="#006466"
          />
        );
    }
  };
  return <View style={styles.iconContainer}>{getIcon()}</View>;
}
