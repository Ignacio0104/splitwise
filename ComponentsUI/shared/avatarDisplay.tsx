import { ReportUserData } from '@/app/store/storeModels';
import React from 'react';
import { Avatar } from 'react-native-paper';

interface AvatarProps {
  userData: Partial<ReportUserData>;
  size: number;
}

export default function AvatarDisplay({ userData, size }: AvatarProps) {
  return (
    // Retorna directamente el JSX
    userData.photoUrl ? (
      <Avatar.Image size={size} source={{ uri: userData.photoUrl }} />
    ) : (
      <Avatar.Text size={size} label={`${(userData.name || '').charAt(0)}${(userData.lastname || '').charAt(0)}`} />
    )
  );
}
