import modalStore from '@/app/store/modalStore';
import React from 'react';
import { Text, View } from 'react-native';
import AvatarDisplay from '../shared/avatarDisplay';
import { DateTime } from 'luxon';

export default function ReportModal() {
  const { modalInformation } = modalStore();
  if (!modalInformation) return;
  const { contributionData, lastname, name, photoUrl } = modalInformation;

  const dateParsed =
    typeof contributionData.date === 'string' ? DateTime.fromISO(contributionData.date) : contributionData.date;
  return (
    <View>
      <View>
        <AvatarDisplay
          userData={{
            name,
            lastname,
            photoUrl,
          }}
          size={20}
        />
        <Text>
          {name} {lastname}
        </Text>
      </View>
      <View>
        <Text>{dateParsed.toFormat('dd/MM/yyyy')}</Text>
        <Text>${contributionData.amount}</Text>
        <Text>${contributionData.description}</Text>
      </View>
    </View>
  );
}
