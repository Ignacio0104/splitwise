import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Appbar, Modal, PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_WIDTH } from '@/constants/Values';
import ReportIcon from '@/ComponentsUI/reports/reportIcon';
import { center, EFonts, verticalCenter } from '@/constants/styleUtils';
import BarChart from '@/ComponentsUI/charts/barChart';
import { Colors, Theme } from '@/constants/Colors';
import store from '../store/mainStore';
import { Report, ReportUserData } from '../store/storeModels';
import UserContribution from '@/ComponentsUI/contributions/userContribution';
import modalStore from '../store/modalStore';
import ReportModal from '@/ComponentsUI/reports/reportModal';

export function useStyles() {
  const { width, height } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;
  const optionsBarHeight = 100;

  return StyleSheet.create({
    backArrowContainer: {
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      height: 'auto',
      fontSize: 40,
      position: 'absolute',
    },
    backArrowStyle: {
      backgroundColor: Theme.grayBackground,
    },
    editViewContainer: {
      display: 'flex',
      height: '100%',
    },
    editHeaderContainer: {
      marginTop: 20,
      height: aspectRatio * 100,
      marginLeft: aspectRatio * 20,
    },
    headerText: {
      fontSize: aspectRatio * 25,
      color: Theme.whiteFont,
      fontFamily: EFonts.POPPINS_BOLD,
    },
    subTitleText: {
      fontFamily: EFonts.POPPINS_REGULAR,
      color: Theme.grayFont,
    },
    creatorName: {
      fontFamily: EFonts.POPPINS_BOLD,
      color: Theme.whiteFont,
    },
    chartContainer: {
      ...center,
      marginTop: 30,
    },
    chartDivisionContainer: {
      ...center,
    },
    chartDivision: {
      height: 2,
      width: '90%',
      backgroundColor: Colors.lightColorPrimary,
      marginTop: 10,
    },
    modalContainerStyle: {
      height: '70%',
      width: '100%',
      marginTop: '100%',
      borderTopLeftRadius: '5%',
      borderTopRightRadius: '5%',
    },
    scrollViewStyle: {
      minHeight: height - optionsBarHeight,
    },
  });
}

export default function ReportEdit() {
  const { reportId } = useLocalSearchParams();
  const { getReportById } = store();
  const { showModal, setShowModal, modalInformation } = modalStore();
  const style = useStyles();

  const [reportInfo, setReportInfo] = useState<Report | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<ReportUserData | null>(null);

  useEffect(() => {
    const report = getReportById((reportId as string) || '');
    setReportInfo(report);
  }, [reportId]);

  const updateSelectedUser = (userData: ReportUserData | null) => {
    setSelectedUser(userData);
  };

  const getCreatorName = () => {
    const name = reportInfo?.creator.name || '';
    const lastname = reportInfo?.creator.lastname || '';

    return `${name} ${lastname}`.trim();
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={style.modalContainerStyle}
          >
            <ReportModal />
          </Modal>
        </Portal>

        <Appbar.Header style={style.backArrowContainer}>
          <Appbar.BackAction
            style={style.backArrowStyle}
            color="white"
            size={35}
            onPress={() => {
              router.replace('/');
            }}
          />
        </Appbar.Header>

        <ScrollView style={{ marginBottom: 80, marginTop: 20 }}>
          <View style={style.scrollViewStyle}>
            <View style={style.editViewContainer}>
              <TouchableOpacity style={style.editHeaderContainer} onPress={() => updateSelectedUser(null)}>
                <Text style={style.headerText}>{reportInfo?.name}</Text>
                <Text style={style.subTitleText}>
                  Gasto creado por {''}
                  <Text style={style.creatorName}>{getCreatorName()}</Text>
                </Text>
              </TouchableOpacity>
              <View style={style.chartContainer}>
                {reportInfo && (
                  <BarChart report={reportInfo} setSelectedUser={updateSelectedUser} selectedUser={selectedUser} />
                )}
              </View>
              <View style={style.chartDivisionContainer}>
                <View style={style.chartDivision}></View>
              </View>
              <View>
                <UserContribution
                  allUsersData={reportInfo?.users ? [...reportInfo.users] : []}
                  selectedUser={selectedUser}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}
