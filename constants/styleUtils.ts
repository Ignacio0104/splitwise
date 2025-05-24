import { ViewStyle } from "react-native";

export const verticalCenter: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

export const center: ViewStyle = {
  ...verticalCenter,
  justifyContent: "center",
};
