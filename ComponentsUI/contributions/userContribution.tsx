import { Contribution, ReportUserData } from '@/app/store/storeModels';
import { center } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import ContributionItem from './contributionItem';
import { sortContributions } from './utils';

interface userContributionProps {
  selectedUser: ReportUserData | null;
  allUsersData: ReportUserData[];
}

export function useStyles() {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    contributionContainer: {
      ...center,
    },
    headerContainer: {
      ...center,
      marginTop: 20,
    },
    headerText: {
      fontSize: aspectRatio * 25,
      color: 'white',
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

  const contributionsToRender = !selectedUser
    ? allUsersData.map((user) => [...user.contributions]).flat()
    : allUsersData.find((user) => user.userId === selectedUser.userId)?.contributions || [];

  const title = selectedUser ? `${selectedUser.name} ${selectedUser.lastname}` : 'Todo';

  return (
    <SafeAreaView>
      <View style={style.contributionContainer}>
        <View>
          <View style={style.headerContainer}>
            {selectedUser && (
              <View>
                {selectedUser.photoUrl ? (
                  <Avatar.Image size={50} source={{ uri: selectedUser?.photoUrl }} />
                ) : (
                  <Avatar.Text size={50} label={`${selectedUser?.name.charAt(0)}${selectedUser?.lastname.charAt(0)}`} />
                )}
              </View>
            )}
            <Text style={style.headerText}>{title}</Text>
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
