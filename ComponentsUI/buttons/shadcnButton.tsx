import { Colors } from "@/constants/Colors";
import { center } from "@/constants/styleUtils";
import { BASE_WIDTH } from "@/constants/Values";
import React, { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

interface ShadcnButtonProps {
  children: string;
  onPress: () => void;
  touchableStyle?: ViewStyle;
  buttonStyle?: TextStyle;
}

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    buttonContainer: {
      ...center,
      margin: "auto",
    },
    touchableStye: {
      width: "auto",
    },
    buttonStyle: {
      backgroundColor: Colors.whiteShadcn,
      marginTop: aspectRatio * 10,
      color: "black",
      paddingVertical: 20,
      paddingHorizontal: 40,
      letterSpacing: 1,
      fontSize: fontSize ?? aspectRatio * 14,
      fontFamily: "Inter_700Bold",
      borderRadius: 20,
      textAlign: "center",
    },
  });
}

export default function ShadcnButton({
  children,
  onPress,
  buttonStyle,
  touchableStyle,
}: ShadcnButtonProps) {
  const styles = useStyles();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={touchableStyle ?? styles.touchableStye}
        onPress={onPress}
      >
        <Text style={buttonStyle ?? styles.buttonStyle}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}
