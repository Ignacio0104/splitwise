import store from '@/app/store/mainStore';
import contributionModalStore from '@/app/store/contributionModalStore';
import { Contribution, Friend } from '@/app/store/storeModels';
import { Theme } from '@/constants/Colors';
import { center, EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import AvatarDisplay from '../shared/avatarDisplay';
import { upperCaseFirstLetter } from './utils';

export interface ContributionItemProps {
  contribution: Contribution;
}

const useStyles = () => {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;
  return StyleSheet.create({
    contributionItem: {
      display: 'flex',
      flexDirection: 'row',
      height: aspectRatio * 50,
      backgroundColor: Theme.grayBackground,
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 10,
    },
    userInfoContainer: {
      display: 'flex',
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 20,
    },
    photoAmountContainer: {
      ...center,
      flex: 1.2,
      justifyContent: 'space-between',
      marginRight: 10,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginRight: 20,
    },
    dateText: {
      fontFamily: EFonts.LATO_REGULAR,
      fontSize: aspectRatio * 11,
      color: Theme.grayFont,
    },
    userInfoText: {
      color: Theme.whiteFont,
      fontFamily: EFonts.LATO_BOLD,
      fontSize: aspectRatio * 17,
    },
    textStylePrice: {
      fontSize: aspectRatio * 15,
    },

    amountContainer: {
      ...center,
    },
    amountText: {
      color: Theme.whiteFont,
      fontFamily: EFonts.LATO_BOLD,
      fontSize: aspectRatio * 18,
    },
    imageContainer: {
      borderRadius: 10,
      height: aspectRatio * 40,
      width: aspectRatio * 40,
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
    },
  });
};

export default function ContributionItem({ contribution }: ContributionItemProps) {
  const style = useStyles();
  const { date, amount, receiptPhotoUrl } = contribution;
  const [userData, setUserData] = useState<Friend | undefined>(undefined);
  const dateParsed = typeof date === 'string' ? DateTime.fromISO(date) : date;
  const monthParsed = upperCaseFirstLetter(dateParsed.monthShort || '');
  const { setShowModal, setModalInformation } = contributionModalStore();
  const { getUserInformation } = store();

  const handleModalOpen = () => {
    setModalInformation({
      contributionData: contribution,
      lastname: userData?.lastname || '',
      name: userData?.name || '',
      photoUrl: userData?.photoUrl,
    });
    setShowModal(true);
  };

  useEffect(() => {
    setUserData(getUserInformation(contribution.userId));
  }, [contribution]);

  return (
    <TouchableOpacity onPress={handleModalOpen} style={style.contributionItem}>
      <View style={style.userInfoContainer}>
        <View style={style.textContainer}>
          <View style={{ marginLeft: 20 }}>
            {userData && (
              <View>
                <AvatarDisplay size={40} userData={userData} />
              </View>
            )}
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={style.userInfoText}>{userData?.name}</Text>
            <Text style={style.dateText}>{dateParsed.setLocale('es').toFormat('d LLLL yyyy')}</Text>
          </View>
        </View>
      </View>
      <View style={style.photoAmountContainer}>
        <View style={style.amountContainer}>
          <Text style={style.amountText}>${amount}</Text>
        </View>
        <View style={style.imageContainer}>
          <Image
            style={style.image}
            resizeMode="cover"
            source={receiptPhotoUrl ? { uri: receiptPhotoUrl } : require('@/assets/images/receiptIcon.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
