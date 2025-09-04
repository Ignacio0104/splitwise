import store from '@/app/store/mainStore';
import { Colors, Theme } from '@/constants/Colors';
import { EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    mainContainer: {
      paddingTop: 10,
      display: 'flex',
      flexDirection: 'row',
      paddingRight: 20,
      alignItems: 'center',
    },
    userPicContainer: {
      marginRight: 20,
      borderColor: Theme.greenHiglight,
      borderWidth: 3,
      borderRadius: '50%',
    },
    mainTitle: {
      color: Theme.whiteFont,
      fontFamily: EFonts.POPPINS_BOLD,
      fontSize: aspectRatio * 25,
    },
    subtitle: {
      color: Theme.whiteFont,
      fontFamily: EFonts.POPPINS_REGULAR,
      fontSize: aspectRatio * 13,
    },
  });
}

export default function UserHeaderInformation() {
  const { userData } = store();
  const styles = useStyles();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.userPicContainer}>
        {userData?.photoUrl ? (
          <Avatar.Image size={90} source={{ uri: userData?.photoUrl }} />
        ) : (
          <Avatar.Text
            size={90}
            style={{ backgroundColor: Theme.greenNoHighlight }}
            labelStyle={{ color: Theme.whiteFont }}
            label={`${userData?.name.charAt(0)}${userData?.lastname.charAt(0)}`}
          ></Avatar.Text>
        )}
      </View>
      <View>
        <Text style={styles.mainTitle}>Hola, {userData?.name}</Text>
        <Text style={styles.subtitle}>Bienvenido devuelta!</Text>
      </View>
    </View>
  );
}
