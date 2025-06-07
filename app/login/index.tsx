import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect, useId, useState } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginSchema } from "./schemas/loginSchema";
import { LoginModel } from "./models/loginModel";
import userAuthStore from "./store/AuthStore";
import ShadcnButton from "../../ComponentsUI/buttons/shadcnButton";
import { Colors } from "@/constants/Colors";
import { BASE_WIDTH } from "@/constants/Values";

export default function Login() {
  const { login, user } = userAuthStore();
  const styles = useStyles();

  const router = useRouter();
  const [afterSave, setAfterSave] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <Formik
          initialValues={{ email: "", password: "" }}
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
                  <Text style={{ fontSize: 20, color: "white" }}>Email</Text>
                }
                mode="outlined"
                textColor="white"
                theme={{
                  colors: {
                    outline:
                      (touched.email || submitCount > 0) && errors.email
                        ? "red"
                        : "white",
                    primary: "white",
                  },
                }}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <View style={styles.errorContainer}>
                <Text
                  style={
                    (touched.email || submitCount > 0) && errors.email
                      ? styles.error
                      : styles.errorHidden
                  }
                >
                  {errors.email}
                </Text>
              </View>
              <TextInput
                style={styles.loginInput}
                textColor="white"
                label={
                  <Text style={{ fontSize: 20, color: "white" }}>Password</Text>
                }
                secureTextEntry={!passwordVisible}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
                theme={{
                  colors: {
                    outline:
                      (touched.password || submitCount > 0) && errors.password
                        ? "red"
                        : "white",
                    primary: "white",
                    error: "red",
                  },
                }}
                mode="outlined"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />

              <View style={styles.errorContainer}>
                <Text
                  style={
                    (touched.password || submitCount > 0) && errors.password
                      ? styles.error
                      : styles.errorHidden
                  }
                >
                  {errors.password}
                </Text>
              </View>
              <View style={styles.forgotPasswordContainer}>
                <Link style={styles.forgetLinkStyle} href={"/"}>
                  Olvidaste tu contraseña?
                </Link>
              </View>
              <View>
                <ShadcnButton
                  buttonStyle={styles.loginButton}
                  touchableStyle={styles.touchableLogin}
                  onPress={() => handleSubmit()}
                >
                  Login
                </ShadcnButton>

                <View style={styles.dividerContainer}>
                  <View style={styles.line} />
                  <Text style={styles.text}>O</Text>
                  <View style={styles.line} />
                </View>
                <ShadcnButton
                  buttonStyle={styles.loginButton}
                  touchableStyle={styles.touchableLogin}
                  onPress={() => handleSubmit()}
                >
                  Registrate
                </ShadcnButton>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
      height: "60%",
      resizeMode: "contain",
    },
    loginInput: {
      color: "black",
      width: "90%",
      backgroundColor: "black",
      borderColor: "white",
      fontSize: 20,
    },
    error: {
      color: "red",
      opacity: 1,
    },
    errorHidden: {
      opacity: 0,
    },
    errorContainer: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "row",
      fontWeight: 600,
      width: "90%",
    },
    touchableLogin: {
      width: "90%",
    },
    loginButton: {
      backgroundColor: Colors.whiteShadcn,
      color: "black",
      width: "100%",
      height: aspectRatio * 50,
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
      justifyContent: "space-between",
      width: "90%",
      marginBottom: aspectRatio * 20,
    },
    forgetLinkStyle: {
      paddingTop: aspectRatio * 10,
      color: "darkgreen",
    },
    actionButtonsContainer: {
      display: "flex",
      gap: 4,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      marginVertical: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: "#666",
    },
    text: {
      color: "#fff",
      marginHorizontal: 10,
      fontWeight: "bold",
    },
  });
}
