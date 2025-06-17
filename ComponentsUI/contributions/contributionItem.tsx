import { Contribution, Friend } from '@/app/store/storeModels';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DateTime } from 'luxon';
import { Avatar } from 'react-native-paper';
import { center } from '@/constants/styleUtils';
import { Colors } from '@/constants/Colors';
import modalStore from '@/app/store/modalStore';
import store from '@/app/store/mainStore';
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
      backgroundColor: Colors.darkColorPrimary,
      alignItems: 'center',
      borderRadius: 10,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    photoContainer: {
      marginLeft: '15%',
      display: 'flex',
      alignItems: 'center',
    },
    textStyle: {
      color: 'white',
    },
    userInfoText: {
      color: 'white',
      fontSize: aspectRatio * 10,
    },
    textStylePrice: {
      fontSize: aspectRatio * 15,
    },
    amountContainer: {
      width: '90%',
      ...center,
      flexDirection: 'column',
    },
  });
};

export default function ContributionItem({ contribution }: ContributionItemProps) {
  const style = useStyles();
  const { date, amount, receiptPhotoUrl } = contribution;
  const [userData, setUserData] = useState<Friend | undefined>(undefined);
  const dateParsed = typeof date === 'string' ? DateTime.fromISO(date) : date;
  const monthParsed = upperCaseFirstLetter(dateParsed.monthShort || '');
  const { setShowModal } = modalStore();
  const { getUserInformation } = store();

  useEffect(() => {
    setUserData(getUserInformation(contribution.userId));
  }, [contribution]);

  return (
    <TouchableOpacity onPress={() => setShowModal(true)} style={style.contributionItem}>
      <View style={style.textContainer}>
        <View style={{ marginLeft: 10 }}>
          <Text style={style.textStyle}>
            {monthParsed} - {dateParsed.year}
          </Text>
        </View>

        <View style={style.amountContainer}>
          <Text style={[style.textStyle, style.textStylePrice, { fontWeight: 'bold' }]}>${amount}</Text>
          <Text style={style.userInfoText}>
            De{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {userData?.name} {userData?.lastname}
            </Text>
          </Text>
        </View>
      </View>
      <View style={style.photoContainer}>
        <Avatar.Image
          size={35}
          style={{ backgroundColor: Colors.gray }}
          source={receiptPhotoUrl ? { uri: receiptPhotoUrl } : require('@/assets/images/receiptIcon.png')}
        />
      </View>
    </TouchableOpacity>
  );
}
