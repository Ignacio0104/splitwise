import userDataStore from "@/app/mainStores/userStore/UserStore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Button } from "react-native-paper";

export default function ReportsMain() {
  const { userData } = userDataStore();

  return (
    <View style={styles.mainContainer}>
      {userData?.reports && userData?.reports?.length > 0 ? (
        <Text style={styles.fontStyleWhite}>Reportes</Text>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,
  },
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
