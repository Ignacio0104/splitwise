import React, { useEffect } from 'react';
import CreationFrom from './creationForm';
import { Stack } from 'expo-router';
import CreationForm from './creationForm';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreationFormLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[{ paddingTop: insets.top }]}>
      <CreationForm />
    </SafeAreaView>
  );
}
