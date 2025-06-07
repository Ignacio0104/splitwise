import { Colors } from "@/constants/Colors";
import { BASE_WIDTH } from "@/constants/Values";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export interface tabButtonsProps {
  focused?: boolean;
  size: number;
  buttonName: "home" | "creation" | "friends";
  bottomProps: BottomTabBarButtonProps;
}

export default function TabButtons({
  size,
  buttonName,
  bottomProps,
}: tabButtonsProps) {
  const styles = useStyles();

  const buttonColor = bottomProps.accessibilityState?.selected
    ? Colors.highlightColor
    : Colors.lightColorSecondary;

  // useEffect(() => {
  //   console.log(bottomProps);
  // }, [bottomProps]);

  const renderIcon = (): React.JSX.Element => {
    switch (buttonName) {
      case "home":
        return <Entypo name="home" size={size} color={buttonColor} />;
      case "creation":
        return <AntDesign name="pluscircle" size={size} color={buttonColor} />;
      case "friends":
        return (
          <FontAwesome5 name="user-friends" size={size} color={buttonColor} />
        );
      default:
        return <Text>Icon not found</Text>;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={(event) => {
        if (bottomProps.onPress) {
          bottomProps.onPress(event);
        }
      }}
      style={
        buttonName === "creation" ? styles.creationStyle : styles.iconContainer
      }
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

export function useStyles() {
  const { width, height } = useWindowDimensions();

  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    creationStyle: {
      position: "absolute",
      left: "20%",
      bottom: aspectRatio * 10,
    },
    iconContainer: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
