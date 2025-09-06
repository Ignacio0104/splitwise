import { Colors, Theme } from '@/constants/Colors';
import { center, EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    emptyImageContainer: {
      margin: 'auto',
      display: 'flex',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: aspectRatio * 90,
      width: '90%',
      marginBottom: 20,
    },
    emptyImage: {
      opacity: 0.3,
      height: '100%',
      resizeMode: 'contain',
    },
    fontStyleWhite: {
      color: 'white',
      fontSize: 15,
      margin: 'auto',
    },
    buttonContainer: {
      width: '90%',
      margin: 'auto',
      ...center,
    },
    descriptionText: {
      color: Theme.whiteFont,
      marginBottom: 30,
      fontFamily: EFonts.POPPINS_BOLD,
      textAlign: 'center',
    },
    createText: {
      color: Theme.whiteFont,
      fontSize: 15,
      marginRight: 20,
      fontFamily: EFonts.POPPINS_REGULAR,
    },
  });
}

export default function ReportsEmpty() {
  const styles = useStyles();
  return (
    <View>
      <View style={styles.emptyImageContainer}>
        <Image style={styles.emptyImage} source={require('../../assets/images/empty-reports.png')} />
      </View>
      <View>
        <Text style={styles.descriptionText}>No formas parte de ningún reporte. Apreta para comenzar</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus-circle"
          buttonColor={Theme.greenNoHighlight}
          onPress={() => console.log('Pressed')}
        >
          <Text style={styles.createText}> Crea tu primer reporte! </Text>
        </Button>
      </View>
    </View>
  );
}
