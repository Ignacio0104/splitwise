import { StyleSheet, View, Text, SafeAreaView, useWindowDimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useEffect } from 'react';
import userAuthStore from '../login/store/AuthStore';
import ReportsMain from '../../ComponentsUI/reports/reportsMain';
import UserHeaderInformation from '@/ComponentsUI/headerInformation/userHeaderInformation';
import store from '../store/mainStore';
import { BASE_WIDTH } from '@/constants/Values';
import { center } from '@/constants/styleUtils';
import { Theme } from '@/constants/Colors';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    loader: {
      ...center,
    },
    subtitle: {
      paddingTop: 10,
      color: Theme.whiteFont,
      fontSize: 20,
    },
    container: {
      flex: 1,
      marginTop: 20,
      marginLeft: 15,
      backgroundColor: Theme.blueBackground,
    },
  });
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = userAuthStore();
  const { fetchData, loading } = store();

  const styles = useStyles();

  useEffect(() => {
    if (user) {
      fetchData(user?.id);
    }
  }, []);

  useEffect(() => {
    //console.log(data);
  }, [loading]);

  return loading ? (
    <ActivityIndicator style={styles.loader} animating={true} size="large" color={MD2Colors.red800} />
  ) : (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <UserHeaderInformation />
      </View>
      <View>
        <ReportsMain />
      </View>
    </SafeAreaView>
  );
}
