import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { connect } from "react-redux";
import { changeLanguage } from "@redux/actions/configActions";
import { loginUser, clearErrors } from "@redux/actions/UserActions";
import CustomInput from "@components/form/CustomInput";

const matriculeRegEx =
  /^([0-9]{6}-[A-Za-z]{1}|[A-Za-z]{1}-[0-9]{6}|[A-Za-z]{2}-[0-9]{6})$/;
// Validation Schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "username must be at least 8 characters")
    .matches(
      /^([0-9]{6}-[A-Za-z]{1}|[A-Za-z]{1}-[0-9]{6}|[A-Za-z]{2}-[0-9]{6})$/,
      "user name should be A-000000 or 000000-A"
    )
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});

const LoginScreen = (props) => {
  const handleLogin = async (values, { setSubmitting }) => {
    props.loginUser({ _username: values.username, _password: values.password });
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.formContainer}>
            <ThemedText type="title" style={styles.title}>
              {props.i18n.t("welcome")}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              {props.i18n.t("login")}
            </ThemedText>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                values,
                setFieldValue,
              }) => (
                <ThemedView style={styles.form}>
                  <CustomInput
                    field={{ name: "username", value: values.username }}
                    form={{
                      handleChange: handleChange,
                      handleBlur: handleBlur,
                      touched: touched,
                      errors: errors,
                    }}
                    placeholder={props.i18n.t("username")}
                    keyboardType="default"
                    autoComplete="username"
                  />

                  <CustomInput
                    field={{ name: "password", value: values.password }}
                    form={{
                      handleChange: handleChange,
                      handleBlur: handleBlur,
                      touched: touched,
                      errors: errors,
                    }}
                    placeholder={props.i18n.t("password")}
                    secureTextEntry
                  />

                  {props.error && (
                    <ThemedText type="error" style={styles.globalError}>
                      {props.error}
                    </ThemedText>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.button,
                      props.isLoading && styles.buttonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={props.isLoading}
                  >
                    {props.isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <ThemedText type="button">
                        {props.i18n.t("login")}
                      </ThemedText>
                    )}
                  </TouchableOpacity>
                </ThemedView>
              )}
            </Formik>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                /* Handle forgot password */
              }}
            >
              <ThemedText type="default">
                {props.i18n.t("forgot_pass")}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "SpaceMono",
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "center",
  },
  title: {
    marginBottom: 64,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: "#99c9ff",
  },
  globalError: {
    textAlign: "center",
    fontSize: 14,
  },
  forgotPassword: {
    marginTop: 24,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  lang: state.config.lang,
  i18n: state.config.i18n,
  error: state.auth.errors,
  isLoading: state.auth.loading,
});

const mapActionsToProps = {
  changeLanguage,
  loginUser,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(LoginScreen);
