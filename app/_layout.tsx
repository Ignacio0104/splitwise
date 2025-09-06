import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import LoginLayout from './login/_layout';
import useAuthStore from './login/store/AuthStore';
import { BASE_WIDTH } from '@/constants/Values';
import { PaperProvider } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// export function useStyles(fontSize?: number) {
//   const { width } = useWindowDimensions();
//   const aspectRatio = width / BASE_WIDTH;

//   return StyleSheet.create({
//     statusBarContainer: {
//       backgroundColor: 'black',
//       height: aspectRatio * 40,
//     },
//   });
// }

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);
  const { user, loading, getAuthState } = useAuthStore();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Extra-Bold': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Extra-Bold': require('../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Montserrat-Thin-Italic': require('../assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf'),
  });

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && fontsLoaded) {
      if (!user) {
        router.replace('/login');
      } else {
        router.replace('/reportForms/creationForm');
        // router.replace({
        //   pathname: '/reportEdit/[reportId]',
        //   params: { reportId: 'KwV07xt8yzkHZf58G5nk' },
        // });
      }
    }
  }, [user, loading, fontsLoaded]);

  if (!loaded || !fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="reportEdit" options={{ headerShown: false }} />
          <Stack.Screen name="reportForms" options={{ headerShown: false }}></Stack.Screen>
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
