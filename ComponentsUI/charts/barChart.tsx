import { Report, ReportUserData } from '@/app/store/storeModels';
import { Colors } from '@/constants/Colors';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { getAmounts } from './chartUtil';
import { Avatar } from 'react-native-paper';
import { center } from '@/constants/styleUtils';

interface BarChartProps {
  report: Report;
  setSelectedUser: (userData: ReportUserData) => void;
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
      width: 20,
      backgroundColor: Colors.highlightColor,
      ...center,
    },
    avatarContainer: {
      marginTop: 10,
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
            ]}
          />
          <View style={styles.avatarContainer}>
            {userItem.photoUrl ? (
              <Avatar.Image size={20} source={{ uri: userItem?.photoUrl }} />
            ) : (
              <Avatar.Text size={20} label={`${userItem?.name.charAt(0)}${userItem?.lastname.charAt(0)}`} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

//TODO: Agregar esperar para esperar que la imagenes carguen
