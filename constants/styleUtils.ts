import { ViewStyle } from 'react-native';

export const verticalCenter: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

export const center: ViewStyle = {
  ...verticalCenter,
  justifyContent: 'center',
};

export enum EFonts {
  LATO_REGULAR = 'Lato-Regular',
  LATO_BOLD = 'Lato-Bold',
  POPPINS_REGULAR = 'Poppins-Regular',
  POPPINS_BOLD = 'Poppins-Bold',
  POPPINS_EXTRA_BOLD = 'Poppins-Extra-Bold',
  MONTSERRAT_REGULAR = 'Montserrat-Regular',
  MONTSERRAT_EXTRA_BOLD = 'Montserrat-Extra-Bold',
}
