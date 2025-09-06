import { Theme } from '@/constants/Colors';
import { center, EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Searchbar, SegmentedButtons } from 'react-native-paper';

export function useStyles() {
  const { width, height } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;
  const optionsBarHeight = 100;

  return StyleSheet.create({
    modalContanier: {
      height: '90%',
      backgroundColor: Theme.gray800,
      width: '90%',
      margin: 'auto',
      borderRadius: 20,
    },
    headerStyle: {
      ...center,
      marginTop: 20,
    },
    headerText: {
      color: Theme.whiteFont,
      fontSize: aspectRatio * 18,
      fontFamily: EFonts.POPPINS_EXTRA_BOLD,
    },
    segmentedBtnContainer: {
      marginTop: 20,
    },
    segmenentedBtn: {
      width: '90%',
      margin: 'auto',
    },
    selectionContainer: {
      width: '90%',
      margin: 'auto',
      marginTop: 30,
    },
    textInput: {
      backgroundColor: Theme.blueBackground,
      borderRadius: 10,
      height: 60,
      color: Theme.whiteFont,
    },
  });
}

export const segmentedTheme = {
  colors: {
    secondaryContainer: Theme.greenNoHighlight,
    onSecondaryContainer: Theme.whiteFont,
    outline: Theme.greenNoHighlight,
    onSurface: Theme.grayFont,
    surface: 'transparent',
  },
};

export default function SelectUserModal() {
  const styles = useStyles();
  const [selectedBtn, setSelectedBtn] = useState<string>('friends');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const setSection = (value: string) => {
    setSelectedBtn(value);
  };

  return (
    <View style={styles.modalContanier}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Splitters</Text>
      </View>
      <View style={styles.segmentedBtnContainer}>
        <SegmentedButtons
          style={styles.segmenentedBtn}
          theme={segmentedTheme}
          value={selectedBtn}
          onValueChange={setSection}
          buttons={[
            { value: 'friends', label: 'Amigos' },
            {
              value: 'guest',
              label: 'Invitado',
            },
          ]}
        />
      </View>
      <View>
        {selectedBtn === 'friends' ? (
          <View style={styles.selectionContainer}>
            <Searchbar
              placeholder="Buscar"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.textInput}
            />
          </View>
        ) : (
          <View style={styles.selectionContainer}>
            <TextInput
              placeholder="eg,. Cena con amigos"
              placeholderTextColor={Theme.grayFont}
              style={[styles.textInput, { paddingLeft: 15 }]}
            />
          </View>
        )}
      </View>
    </View>
  );
}
