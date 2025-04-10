import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { loginSchema } from "./schemas/loginSchema";
import { LoginModel } from "./models/loginModel";
import userAuthStore from "./store/AuthStore";
import userDataStore from "../(tabs)/userStore/UserStore";

export default function Login() {
  const { login, loading, error, user } = userAuthStore();
  const { fetchData, saveData } = userDataStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [afterSave, setAfterSave] = useState(false);

  const handleLogin = (values: LoginModel) => {
    setAfterSave(true);
    console.log(user);
    login(values.email, values.password).then(() => {
      console.log("Finished");
      if (user) {
        router.replace("/");
        setAfterSave(false);
      }
    });
  };

  return (
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
          <Button
            mode="contained"
            style={styles.loginButtonStyle}
            onPress={() => handleSubmit()}
          >
            Login
          </Button>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  googleIcon: {
    width: 20,
    height: 20,
    display: "flex",
    marginLeft: 20,
  },
  googleLogin: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 20,
    width: "90%",
    color: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  loginButtonStyle: {
    marginTop: 20,
    width: "90%",
  },
});
