import { Report } from "@/app/mainStores/userStore/userStoreModels";
import { center } from "@/constants/styleUtils";
import React from "react";
import { StyleSheet, View } from "react-native";

interface LineChartProps {
  report: Report;
}

const useStyles = () => {
  return StyleSheet.create({
    backgroundColor: {
      width: "90%",
      height: 20,
      backgroundColor: "grey",
    },
    percentage: {
      height: 20,
    },
  });
};

export default function LineChart(props: LineChartProps) {
  const style = useStyles();
  const {
    report: { users },
  } = props;

  const colorsArray = ["blue", "red", "yellow", "green"];

  return (
    <View style={style.backgroundColor}>
      {users.map((user, index) => {
        return (
          <View
            key={index}
            style={[
              {
                backgroundColor: colorsArray[index],
                width: `${user.percentage}%`,
              },
              style.percentage,
            ]}
          ></View>
        );
      })}
    </View>
  );
}
