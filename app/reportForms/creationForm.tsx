import { Theme } from '@/constants/Colors';
import { EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { reportFormSchema, reportInitialValues } from './schemas/report-form-schema';
import { LoginModel } from '../login/models/loginModel';
import { ReportFormModel } from './models/reportFormsModels';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    appBarHeader: {
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      height: 'auto',
      fontSize: 40,
      position: 'absolute',
    },
    backArrowStyle: {
      backgroundColor: Theme.grayBackground,
    },
    headerContainer: {
      flex: 0.95,
      alignItems: 'center',
    },
    headerText: {
      fontFamily: EFonts.LATO_BOLD,
      fontSize: aspectRatio * 20,
      color: Theme.whiteFont,
    },
    formContainer: {
      marginTop: aspectRatio * 50,
      width: '95%',
      margin: 'auto',
    },
    expenseNameInputContainer: {
      display: 'flex',
      gap: 10,
    },
    expenseNameLabel: {
      color: Theme.grayFont,
      fontFamily: EFonts.MONTSERRAT_REGULAR,
    },
    expenseTextInput: {
      backgroundColor: Theme.grayBackground,
      borderRadius: 10,
      height: 60,
      color: Theme.whiteFont,
      paddingLeft: 15,
    },
  });
}

export default function CreationForm() {
  const styles = useStyles();

  const handleSubmit = (values: ReportFormModel) => {
    console.log(values);
  };

  useEffect(() => {}, []);
  return (
    <View>
      <Appbar.Header style={styles.appBarHeader}>
        <Appbar.BackAction
          style={styles.backArrowStyle}
          color="white"
          size={35}
          onPress={() => {
            router.replace('/');
          }}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Nuevo Reporte</Text>
        </View>
      </Appbar.Header>
      <View>
        <Formik
          initialValues={reportInitialValues}
          validationSchema={reportFormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitCount }) => (
            <View style={styles.formContainer}>
              <View style={styles.expenseNameInputContainer}>
                <Text style={styles.expenseNameLabel}>Nombre Reporte</Text>
                <TextInput
                  placeholder="eg,. Cena con amigos"
                  placeholderTextColor={Theme.grayFont}
                  style={styles.expenseTextInput}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
