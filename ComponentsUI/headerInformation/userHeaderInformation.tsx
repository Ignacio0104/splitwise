import userDataStore from "@/app/mainStores/userStore/UserStore";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

export default function UserHeaderInformation() {
  const { userData } = userDataStore();

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mainTitle}>Hola, {userData?.name}</Text>
        <Text style={styles.subtitle}>Bienvenido devuelta!</Text>
      </View>
      <View>
        {userData?.photoUrl ? (
          <Avatar.Image size={75} source={{ uri: userData?.photoUrl }} />
        ) : (
          <Avatar.Text
            size={75}
            label={`${userData?.name.charAt(0)}${userData?.lastname.charAt(0)}`}
          ></Avatar.Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  mainTitle: {
    color: "white",
    fontSize: 30,
  },
  subtitle: {
    color: "white",
    fontSize: 20,
  },
});
