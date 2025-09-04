import modalStore from '@/app/store/modalStore';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import AvatarDisplay from '../shared/avatarDisplay';
import { DateTime } from 'luxon';
import { BASE_WIDTH } from '@/constants/Values';
import { center } from '@/constants/styleUtils';
import { Avatar, Button } from 'react-native-paper';
import { Colors, Theme } from '@/constants/Colors';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    modalMain: {
      height: '100%',
      backgroundColor: Theme.grayBackground,
      borderTopLeftRadius: '5%',
      borderTopRightRadius: '5%',
    },
    headerModal: {
      paddingTop: 20,
      ...center,
      marginLeft: 25,
      justifyContent: 'space-between',
    },
    leftHeader: {
      ...center,
      gap: 20,
    },
    informationContainer: {
      ...center,
      flexDirection: 'column',
    },
    receiptPhoto: {
      height: '100%',
      width: '90%',
      margin: 'auto',
    },
    noReceiptPhoto: {
      height: '100%',
      width: '75%',
      marginLeft: '15%',
    },
    username: {
      fontFamily: 'Lato-Bold',
      fontWeight: 900,
      fontSize: aspectRatio * 25,
      color: Theme.whiteFont,
    },
    receiptPhotoContainer: {
      paddingTop: 20,
      height: '50%',
    },
    dateText: {
      fontFamily: 'Lato-Regular',
      fontSize: aspectRatio * 13,
      color: Theme.grayFont,
    },
    amountText: {
      fontFamily: 'Lato-Bold',
      fontWeight: 900,
      fontSize: aspectRatio * 25,
      color: Theme.whiteFont,
      marginRight: 10,
    },
    testContainer: {
      backgroundColor: 'blue',
    },
    descriptionContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      height: aspectRatio * 70,
    },
    descriptionText: {
      marginTop: 10,
      fontFamily: 'Lato-Regular',
      fontSize: aspectRatio * 15,
      color: Theme.whiteFont,
    },
    closeButton: {
      backgroundColor: Theme.greenHiglight,
      margin: 'auto',
      height: aspectRatio * 35,
      borderRadius: 10,
      width: '90%',
      ...center,
    },
    closeText: {
      fontFamily: 'Lato-Bold',
      fontWeight: 400,
      fontSize: aspectRatio * 18,
      color: Theme.black,
    },
  });
}

export default function ReportModal() {
  const styles = useStyles();
  const { modalInformation, setShowModal } = modalStore();
  if (!modalInformation) return;
  const { contributionData, lastname, name, photoUrl } = modalInformation;

  const { amount, date, reportId, description, receiptPhotoUrl } = contributionData;

  const closeModal = () => {
    setShowModal(false);
  };

  const dateParsed = typeof date === 'string' ? DateTime.fromISO(date) : date;
  return (
    <View style={styles.modalMain}>
      <View style={styles.headerModal}>
        <View style={styles.leftHeader}>
          <AvatarDisplay
            userData={{
              name,
              lastname,
              photoUrl,
            }}
            size={50}
          />
          <View>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.dateText}>{dateParsed.setLocale('es').toFormat('d LLLL yyyy')}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.amountText}>${amount}</Text>
        </View>
      </View>
      <View style={styles.receiptPhotoContainer}>
        {receiptPhotoUrl ? (
          <Image style={styles.receiptPhoto} resizeMode="contain" source={{ uri: receiptPhotoUrl }} />
        ) : (
          <View>
            <Image
              style={styles.noReceiptPhoto}
              resizeMode="contain"
              source={require('@/assets/images/no-receipt-image.png')}
            />
          </View>
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeText}> Cerrar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
