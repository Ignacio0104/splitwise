import { Contribution } from '@/app/store/storeModels';
import { BASE_WIDTH } from '@/constants/Values';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DateTime } from 'luxon';
import { Avatar } from 'react-native-paper';
import { center } from '@/constants/styleUtils';
import { Colors } from '@/constants/Colors';
import modalStore from '@/app/store/modalStore';

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
      height: aspectRatio * 40,
      backgroundColor: 'green',
      alignItems: 'center',
      borderRadius: 10,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-around',
    },
    photoContainer: {
      marginLeft: '15%',
      display: 'flex',
      alignItems: 'center',
    },
    textStyle: {
      color: 'white',
    },
  });
};

export default function ContributionItem({ contribution }: ContributionItemProps) {
  const style = useStyles();
  const { date, amount, receiptPhotoUrl } = contribution;
  const dateParsed = typeof date === 'string' ? DateTime.fromISO(date) : date;
  const { setShowModal } = modalStore();

  return (
    <TouchableOpacity onPress={() => setShowModal(true)} style={style.contributionItem}>
      <View style={style.textContainer}>
        <Text style={style.textStyle}>{dateParsed.toLocaleString()}</Text>
        <Text style={[style.textStyle, { fontWeight: 'bold' }]}>${amount}</Text>
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
