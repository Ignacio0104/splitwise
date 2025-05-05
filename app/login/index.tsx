import { useRouter } from "expo-router";
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
            <Text>Email:</Text>
            <TextInput
              style={styles.loginInput}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {(touched.email || submitCount > 0) && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text>Password:</Text>
            <TextInput
              style={styles.loginInput}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />

            {(touched.password || submitCount > 0) && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <ShadcnButton onPress={() => handleSubmit()}>Login</ShadcnButton>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export function useStyles() {
  const { width } = useWindowDimensions();

  const aspectRatio = (1 / width) * 100;

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
    },
    error: {
      color: "red",
    },
    loginButtonStyle: {
      marginTop: aspectRatio * 100,
      width: "90%",
    },
  });
}
