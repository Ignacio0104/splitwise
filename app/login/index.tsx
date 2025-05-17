import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect, useId, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginSchema } from "./schemas/loginSchema";
import { LoginModel } from "./models/loginModel";
import userAuthStore from "./store/AuthStore";
import userDataStore from "../mainStores/userStore/UserStore";
import ShadcnButton from "../../ComponentsUI/buttons/shadcnButton";
import { Colors } from "@/constants/Colors";
import { BASE_WIDTH } from "@/constants/Values";

export default function Login() {
  const { login, user } = userAuthStore();
  const styles = useStyles();

  const router = useRouter();
  const [afterSave, setAfterSave] = useState(false);

  const handleLogin = (values: LoginModel) => {
    setAfterSave(true);
    login(values.email, values.password).then(() => {
      if (user) {
        router.replace("/");
        setAfterSave(false);
      }
    });
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ email: "nacho@test.com", password: "123456" }}
        validationSchema={loginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          submitCount,
        }) => (
          <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/pattern_logo.png")}
                style={styles.logoImage}
              />
            </View>
            <TextInput
              style={styles.loginInput}
              label={
                <Text style={{ fontSize: 25, color: "white" }}>Email</Text>
              }
              mode="outlined"
              textColor="white"
              theme={{
                colors: {
                  outline: "white",
                  primary: "white",
                },
              }}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {(touched.email || submitCount > 0) && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.loginInput}
              textColor="white"
              label={
                <Text style={{ fontSize: 25, color: "white" }}>Password</Text>
              }
              secureTextEntry
              theme={{
                colors: {
                  outline: "white",
                  primary: "white",
                },
              }}
              mode="outlined"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />

            {(touched.password || submitCount > 0) && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <View style={styles.forgotPasswordContainer}>
              <Link style={styles.linkStyle} href={"/"}>
                Forgot your password?
              </Link>
            </View>
            <ShadcnButton
              buttonStyle={styles.loginButton}
              touchableStyle={styles.touchableLogin}
              onPress={() => handleSubmit()}
            >
              Login
            </ShadcnButton>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export function useStyles() {
  const { width } = useWindowDimensions();

  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    loginContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "auto",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      height: "50%",
    },
    logoImage: {
      width: "100%",
      height: "80%",
      resizeMode: "contain",
    },
    loginInput: {
      color: "black",
      width: "90%",
      backgroundColor: "black",
      borderColor: "white",
      marginTop: 20,
      fontSize: 20,
    },
    error: {
      color: "red",
    },
    touchableLogin: {
      width: "90%",
    },
    loginButton: {
      backgroundColor: Colors.whiteShadcn,
      marginTop: aspectRatio * 20,
      color: "black",
      width: "100%",
      height: aspectRatio * 40,
      letterSpacing: 1,
      fontSize: aspectRatio * 14,
      fontFamily: "Inter_700Bold",
      borderRadius: 10,
      textAlign: "center",
      textAlignVertical: "center",
    },
    forgotPasswordContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingRight: 20,
      width: "100%",
    },
    linkStyle: {
      paddingTop: aspectRatio * 10,
      color: "darkgreen",
    },
  });
}

export const InputTheme = {
  colors: {
    primary: "red",
    text: "green",
    placeholder: "gray",
    background: "black",
    outlineColor: "white",
  },
};
