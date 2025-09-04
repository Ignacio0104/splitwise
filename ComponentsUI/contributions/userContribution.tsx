import { Contribution, ReportUserData } from '@/app/store/storeModels';
import { center, EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import ContributionItem from './contributionItem';
import { sortContributions } from './utils';
import AvatarDisplay from '../shared/avatarDisplay';
import { Theme } from '@/constants/Colors';

interface userContributionProps {
  selectedUser: ReportUserData | null;
  allUsersData: ReportUserData[];
}

export function useStyles() {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    contributionTotalContainer: {
      marginRight: 20,
    },
    contributionTotal: {
      fontSize: aspectRatio * 20,
      color: Theme.whiteFont,
      fontFamily: EFonts.LATO_BOLD,
      marginLeft: aspectRatio * 20,
    },
    headerText: {
      fontSize: aspectRatio * 18,
      color: Theme.whiteFont,
      fontFamily: EFonts.LATO_BOLD,
      marginLeft: aspectRatio * 20,
    },
    contributionListContainer: {
      width: '90%',
      margin: 'auto',
      marginTop: 25,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    },
  });
}

export default function UserContribution({ allUsersData, selectedUser }: userContributionProps) {
  const style = useStyles();

  const [contributionsToRender, setContributionsToRender] = useState<Contribution[]>([]);
  const [contributionsTotal, setContributionsTotal] = useState<number>(0);

  const getContributionToRender = () => {
    const contributions = !selectedUser
      ? allUsersData.map((user) => [...user.contributions]).flat()
      : allUsersData.find((user) => user.userId === selectedUser.userId)?.contributions || [];

    const contributionTotal: number = contributions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    setContributionsTotal(contributionTotal);
    setContributionsToRender(contributions);
  };

  const title = selectedUser ? `${selectedUser.name} ${selectedUser.lastname}` : 'Contribuciones';

  useEffect(() => {
    getContributionToRender();
  }, [selectedUser]);

  return (
    <SafeAreaView>
      <View>
        <View>
          <View style={style.headerContainer}>
            <Text style={style.headerText}>{title}</Text>
            <View style={style.contributionTotalContainer}>
              <Text style={style.contributionTotal}>${contributionsTotal}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={style.contributionListContainer}>
        {contributionsToRender
          .sort((a, b) => sortContributions(a, b))
          .map((contribution, index) => (
            <ContributionItem key={index} contribution={contribution} />
          ))}
      </View>
    </SafeAreaView>
  );
}
