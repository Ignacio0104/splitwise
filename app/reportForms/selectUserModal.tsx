import { Theme } from '@/constants/Colors';
import { center, EFonts } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Searchbar, SegmentedButtons } from 'react-native-paper';
import selectUserModalStore from '../store/selectUserModalStore';
import store from '../store/mainStore';
import AvatarDisplay from '@/ComponentsUI/shared/avatarDisplay';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SelectionFriend } from '../store/modalStoreModels';

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
    friendScroll: {
      marginTop: 20,
      height: '60%',
      marginLeft: 10,
    },
    friendImageTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: aspectRatio * 50,
      marginBottom: 15,
      gap: 10,
    },
    friendContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    friendText: {
      fontFamily: EFonts.LATO_BOLD,
      color: Theme.whiteFont,
    },
    checkContainer: {
      ...center,
      marginRight: 10,
      width: 50,
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
  const [filteredList, setFilteredList] = useState<SelectionFriend[]>([]);
  const { modalInformation, setModalInformation } = selectUserModalStore();
  const { friends } = store();

  useEffect(() => {
    setModalInformation(friends);
    setFilteredList(friends);

    return () => {
      setModalInformation([]);
    };
  }, []);

  useEffect(() => {
    filterList(searchQuery);

    return () => {
      setFilteredList(friends);
    };
  }, [searchQuery]);

  const updateUserSelection = (userId: string) => {
    const updatedList = (modalInformation || []).map((user) => {
      if (user.userId === userId) {
        return {
          ...user,
          selected: !user.selected,
        };
      }
      return user;
    });

    setModalInformation(updatedList);
  };

  const filterList = (query: string) => {
    if (!query) {
      setFilteredList(friends);
    } else {
      const filteredList = friends.filter((friend) => {
        const queryLower = query.toLowerCase();
        const nameLowerCase = friend.name.toLowerCase();
        const lastnameLowerCase = friend.lastname.toLowerCase();
        return nameLowerCase.includes(queryLower) || lastnameLowerCase.includes(queryLower);
      });
      setFilteredList(filteredList);
    }
  };

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
            <ScrollView style={styles.friendScroll}>
              {filteredList?.map((friend) => (
                <View key={friend.userId} style={styles.friendContainer}>
                  <View style={styles.friendImageTextContainer}>
                    <AvatarDisplay userData={friend} size={45} />
                    <Text style={styles.friendText}>
                      {friend.name} {friend.lastname}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.checkContainer} onPress={() => updateUserSelection(friend.userId)}>
                    {!friend.selected ? (
                      <AntDesign name="checkcircleo" size={24} color={Theme.greenNoHighlight} />
                    ) : (
                      <AntDesign name="checkcircle" size={24} color={Theme.greenHiglight} />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
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
