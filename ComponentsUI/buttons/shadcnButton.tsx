import { Colors } from "@/constants/Colors";
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
  style?: ViewStyle | TextStyle; // Permite pasar estilos tanto para el contenedor (View) como para el texto
}

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    buttonStyle: {
      backgroundColor: Colors.whiteShadcn,
      marginTop: aspectRatio * 10,
      color: "black",
      padding: 20,
      fontSize: fontSize ?? aspectRatio * 16,
      fontFamily: "Inter_700Bold",
      borderRadius: 20,
      width: "100%",
    },
  });
}

export default function ShadcnButton({ children, onPress }: ShadcnButtonProps) {
  const styles = useStyles();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonStyle}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}
