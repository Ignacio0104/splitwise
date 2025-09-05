import { Report, ReportUserData, UserData } from '@/app/store/storeModels';
import { Colors, Theme } from '@/constants/Colors';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { getAmounts } from './chartUtil';
import { center } from '@/constants/styleUtils';
import AvatarDisplay from '../shared/avatarDisplay';

interface BarChartProps {
  report: Report;
  setSelectedUser: (userData: ReportUserData) => void;
  selectedUser: ReportUserData | null;
}

const useStyles = () => {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;
  return StyleSheet.create({
    chartBackground: {
      height: aspectRatio * 200,
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',
    },
    barStyle: {
      width: aspectRatio * 25,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      ...center,
    },
    avatarContainer: {
      marginTop: 10,
      ...center,
    },
  });
};

export default function BarChart(props: BarChartProps) {
  const styles = useStyles();

  const animatedBarHeights = useRef(props.report.users.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const amounts = getAmounts(props.report);
    const maxAmount = amounts.get('MaxContribution') || 0;

    if (maxAmount === 0) {
      animatedBarHeights.forEach((val) => val.setValue(0));
      return;
    }
    const animations = props.report.users.map((user, index) => {
      const totalHeight = styles.chartBackground.height;

      const normalizedHeight = ((amounts.get(user.userId) ?? 0) / maxAmount) * totalHeight;

      return Animated.timing(animatedBarHeights[index], {
        toValue: normalizedHeight,
        duration: 800,
        useNativeDriver: false,
      });
    });
    setTimeout(() => {
      Animated.parallel(animations).start();
    }, 300);
    props.setSelectedUser(props.report.users[1]);
  }, [props.report.users]);

  return (
    <View style={styles.chartBackground}>
      {props.report.users.map((userItem, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            props.setSelectedUser(userItem);
          }}
        >
          <Animated.View
            style={[
              styles.barStyle,
              {
                height: animatedBarHeights[index],
              },
              {
                backgroundColor:
                  !props.selectedUser || props.selectedUser.userId === userItem.userId
                    ? Theme.greenHiglight
                    : Theme.greenNoHighlight,
              },
            ]}
          />
          <View style={styles.avatarContainer}>
            <AvatarDisplay userData={userItem} size={20} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

//TODO: Agregar esperar para esperar que la imagenes carguen
