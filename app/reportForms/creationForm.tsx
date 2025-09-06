import { Theme } from '@/constants/Colors';
import { center, EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Appbar, Switch } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { reportFormSchema, reportInitialValues } from './schemas/report-form-schema';
import { LoginModel } from '../login/models/loginModel';
import { ReportFormModel } from './models/reportFormsModels';
import RNPickerSelect from 'react-native-picker-select';
import { reportDropdownOption } from '../store/models';

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
    expenseTextInput: {
      backgroundColor: Theme.grayBackground,
      borderRadius: 10,
      height: 60,
      color: Theme.whiteFont,
      paddingLeft: 15,
    },
    dropdownContainer: {
      marginTop: 20,
      display: 'flex',
      gap: 10,
    },
    formLabel: {
      color: Theme.grayFont,
      fontFamily: EFonts.MONTSERRAT_REGULAR,
    },
    dropdown: {
      backgroundColor: Theme.grayBackground,
      borderRadius: 10,
      height: 60,
    },
    fixedPriceContainer: {
      marginTop: 30,
      ...center,
      justifyContent: 'space-around',
    },
    fixedPriceText: {
      fontSize: aspectRatio * 18,
    },
    totalNumberContainer: {
      marginTop: 20,
      display: 'flex',
      gap: 10,
    },
  });
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Theme.grayBackground,
    borderRadius: 20,
    height: 60,
    color: Theme.whiteFont,
  },
  inputAndroid: {
    backgroundColor: Theme.grayBackground,
    borderRadius: 20,
    height: 60,
    color: Theme.whiteFont,
  },
  viewContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  switchStyle: {
    fontSize: 40,
  },
});

export default function CreationForm() {
  const styles = useStyles();

  const [selectedType, setSelectedType] = useState<string>(reportDropdownOption[0].value);
  const [fixedPrice, setFixedPrice] = useState<boolean>(false);

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
                <Text style={styles.formLabel}>Nombre Reporte</Text>
                <TextInput
                  placeholder="eg,. Cena con amigos"
                  placeholderTextColor={Theme.grayFont}
                  style={styles.expenseTextInput}
                />
              </View>
              <View style={styles.dropdownContainer}>
                <Text style={styles.formLabel}>Tipo</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedType(value)}
                  items={reportDropdownOption}
                  placeholder={{ label: 'Selecciona un tipo...', value: null }}
                  value={selectedType}
                  style={pickerSelectStyles}
                />
              </View>
              <View style={styles.fixedPriceContainer}>
                <Text style={[styles.formLabel, styles.fixedPriceText]}> Precio fijo </Text>
                <Switch
                  color={Theme.greenHiglight}
                  value={fixedPrice}
                  onValueChange={() => setFixedPrice(!fixedPrice)}
                />
              </View>
              <View style={(styles.totalNumberContainer, { display: fixedPrice ? 'flex' : 'none' })}>
                <Text style={styles.formLabel}>Total</Text>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
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
