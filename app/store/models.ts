export enum ReportType {
  DINNER = 'dinner',
  HOUSEHOLD = 'household',
  TRIP = 'trip',
  PARTY = 'party',
  SHOPPING = 'shopping',
}

export const reportDropdownOption = [
  { label: 'Cena', value: ReportType.DINNER },
  { label: 'Hogar', value: ReportType.HOUSEHOLD },
  { label: 'Viaje', value: ReportType.TRIP },
  { label: 'Fiesta', value: ReportType.PARTY },
  { label: 'Shopping', value: ReportType.SHOPPING },
];
