import store from '@/app/store/mainStore';
import { getTotalFromReport } from '@/app/store/utils';
import { Theme } from '@/constants/Colors';
import { EFonts, verticalCenter } from '@/constants/styleUtils';
import { BASE_WIDTH } from '@/constants/Values';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import ReportIcon from './reportIcon';

export function useStyles(fontSize?: number) {
  const { width } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;

  return StyleSheet.create({
    mainContainer: {
      marginTop: 15,
    },
    reportContainer: {
      height: aspectRatio * 70,
      marginBottom: 20,
      ...verticalCenter,
      backgroundColor: Theme.gray800,
      borderRadius: 20,
    },
    reportsTitle: {
      color: Theme.whiteFont,
      fontSize: aspectRatio * 17,
      fontFamily: EFonts.LATO_BOLD,
      marginBottom: 12,
    },
    reportItemTitle: {
      fontSize: aspectRatio * 15,
      color: Theme.whiteFont,
      fontFamily: EFonts.MONTSERRAT_EXTRA_BOLD,
    },
    splitterInfo: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      paddingTop: 5,
    },
    splitterName: {
      marginRight: aspectRatio * 10,
      color: Theme.grayFont,
      fontStyle: 'italic',
      fontFamily: EFonts.MONTSERRAT_THIN_ITALIC,
    },
    splitterTitle: {
      marginRight: 12,
      color: Theme.grayFont,
      fontFamily: EFonts.MONTSERRAT_REGULAR,
    },
    informationContainer: {
      marginLeft: aspectRatio * 14,
      display: 'flex',
      paddingTop: 10,
      height: '100%',
    },
    totalContainer: {
      marginLeft: 'auto',
      marginRight: 15,
    },
    reportScroll: {
      height: aspectRatio * 500,
    },
    totalText: {
      color: Theme.greenHiglight,
      fontSize: aspectRatio * 17,
      fontFamily: EFonts.MONTSERRAT_EXTRA_BOLD,
    },
  });
}

export default function ReportsContent() {
  const { userData } = store();
  const reports = userData?.reports;
  const styles = useStyles();

  const redirectToReport = (reportId: string) => {
    router.replace({
      pathname: '/reportEdit/[reportId]',
      params: { reportId },
    });
  };

  const memoizedReports = useMemo(() => {
    return reports?.map((report) => ({
      ...report,
      total: getTotalFromReport(report),
    }));
  }, [reports]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.reportsTitle}>Tus reportes:</Text>
      <View style={styles.reportScroll}>
        <ScrollView>
          {memoizedReports?.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={styles.reportContainer}
              onPress={() => redirectToReport(report.id)}
            >
              <ReportIcon type={report.type} />
              <View style={styles.informationContainer}>
                <Text style={styles.reportItemTitle}>{report.name}</Text>
                <View style={styles.splitterInfo}>
                  <Text style={styles.splitterTitle}>Splitters: </Text>
                  {report.users.map((user, index) => (
                    <Text style={styles.splitterName} key={index}>
                      {user.name}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>$ {report.total}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
