import React from "react";
import { View } from "react-native";
import { Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";

export default function ReportsEmpty() {
  return (
    <View>
      <Text style={styles.fontStyleWhite}>No hay reportes!</Text>
      <View style={styles.emptyImageContainer}>
        <Image
          style={styles.emptyImage}
          source={require("../../../assets/images/empty-reports.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus-circle"
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
    display: "flex",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  emptyImage: {
    height: "80%",
    opacity: 0.3,
    resizeMode: "contain",
  },
  fontStyleWhite: {
    color: "white",
    fontSize: 15,
  },
  buttonContainer: {
    width: "90%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  createText: {
    color: "white",
    fontSize: 15,
    marginRight: 20,
  },
});
