import { Tabs } from "expo-router";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { BASE_WIDTH } from "@/constants/Values";
import TabButtons from "@/ComponentsUI/buttons/tabButtons";

export default function TabLayout() {
  const styles = useStyles();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabsStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarButton: (props) => {
            return (
              <TabButtons bottomProps={props} buttonName="home" size={35} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="creation"
        options={{
          title: "Creation",
          tabBarButton: (props) => {
            return (
              <TabButtons bottomProps={props} buttonName="creation" size={80} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarButton: (props) => {
            return (
              <TabButtons bottomProps={props} buttonName="friends" size={35} />
            );
          },
        }}
      />
    </Tabs>
  );
}

export function useStyles() {
  const { width } = useWindowDimensions();

  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    tabsStyle: {
      height: aspectRatio * 65,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "auto",
      alignItems: "center",
    },
  });
}
