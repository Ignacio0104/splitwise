import modalStore from '@/app/store/modalStore';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import AvatarDisplay from '../shared/avatarDisplay';
import { DateTime } from 'luxon';
import { BASE_WIDTH } from '@/constants/Values';
import { center } from '@/constants/styleUtils';
import { Avatar } from 'react-native-paper';
import { Colors } from '@/constants/Colors';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    modalMain: {
      height: '100%',
      backgroundColor: 'red',
    },
    headerModal: {
      paddingTop: 20,
      ...center,
      justifyContent: 'space-around',
    },
    informationContainer: {
      ...center,
      flexDirection: 'column',
    },
    receiptPhoto: {
      marginTop: 20,
      height: '75%',
      width: '90%',
      margin: 'auto',
    },
    noReceiptPhoto: {
      height: '70%',
      width: '75%',
      marginLeft: '15%',
    },
    text: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: '#333',
    },
  });
}

export default function ReportModal() {
  const styles = useStyles();
  const { modalInformation } = modalStore();
  if (!modalInformation) return;
  const { contributionData, lastname, name, photoUrl } = modalInformation;

  const { amount, date, reportId, description, receiptPhotoUrl } = contributionData;

  useEffect(() => {}, []);

  const dateParsed = typeof date === 'string' ? DateTime.fromISO(date) : date;
  return (
    <View style={styles.modalMain}>
      <View style={styles.headerModal}>
        <AvatarDisplay
          userData={{
            name,
            lastname,
            photoUrl,
          }}
          size={70}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.informationContainer}>
        <Text>{dateParsed.toFormat('dd/MM/yyyy')}</Text>
        <Text>${amount}</Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.receiptPhoto}>
        {!receiptPhotoUrl ? (
          <Image style={styles.receiptPhoto} resizeMode="contain" source={{ uri: receiptPhotoUrl }} />
        ) : (
          <View>
            <Image
              style={styles.noReceiptPhoto}
              resizeMode="contain"
              source={require('@/assets/images/no-receipt-image.png')}
            />
            <Text>Sin recibo</Text>
          </View>
        )}
      </View>
    </View>
  );
}
