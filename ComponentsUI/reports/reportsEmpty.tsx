import { Colors } from "@/constants/Colors";
import { center } from "@/constants/styleUtils";
import React from "react";
import { View } from "react-native";
import { Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";

export default function ReportsEmpty() {
  return (
    <View>
      <Text style={styles.fontStyleWhite}>No se encontraron resportes</Text>
      <View style={styles.emptyImageContainer}>
        <Image
          style={styles.emptyImage}
          source={require("../../assets/images/empty-reports.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus-circle"
          buttonColor={Colors.highlightColor}
          onPress={() => console.log("Pressed")}
        >
          <Text style={styles.createText}> Crea tu primer reporte! </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyImageContainer: {
    margin: "auto",
    display: "flex",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    width: "90%",
  },
  emptyImage: {
    opacity: 0.3,
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  fontStyleWhite: {
    color: "white",
    fontSize: 15,
    margin: "auto",
  },
  buttonContainer: {
    width: "90%",
    margin: "auto",
    ...center,
  },
  createText: {
    color: Colors.darkColorSecondary,
    fontSize: 15,
    marginRight: 20,
  },
});
