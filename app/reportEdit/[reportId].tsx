import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Appbar, Modal, PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_WIDTH } from '@/constants/Values';
import ReportIcon from '@/ComponentsUI/reports/reportIcon';
import { center, verticalCenter } from '@/constants/styleUtils';
import BarChart from '@/ComponentsUI/charts/barChart';
import { Colors } from '@/constants/Colors';
import store from '../store/mainStore';
import { Report, ReportUserData } from '../store/storeModels';
import UserContribution from '@/ComponentsUI/contributions/userContribution';
import modalStore from '../store/modalStore';

export function useStyles() {
  const { width, height } = useWindowDimensions();
  const aspectRatio = width / BASE_WIDTH;
  const optionsBarHeight = 100;

  return StyleSheet.create({
    backArrowStyle: {
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      height: 'auto',
      fontSize: 40,
      position: 'absolute',
    },
    editViewContainer: {
      display: 'flex',
      height: '100%',
    },
    editHeaderContainer: {
      ...center,
      height: aspectRatio * 100,
    },
    headerText: {
      fontSize: aspectRatio * 25,
      color: 'white',
      marginLeft: aspectRatio * 20,
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
      backgroundColor: 'white',
      margin: 40,
      height: 80,
    },
    scrollViewStyle: {
      minHeight: height - optionsBarHeight,
    },
  });
}

export default function ReportEdit() {
  const { reportId } = useLocalSearchParams();
  const { getReportById } = store();
  const { showModal, setShowModal } = modalStore();
  const style = useStyles();

  const [reportInfo, setReportInfo] = useState<Report | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<ReportUserData | null>(null);

  useEffect(() => {
    const report = getReportById((reportId as string) || '');
    setReportInfo(report);

    return setShowModal(false);
  }, [reportId]);

  const updateSelectedUser = (userData: ReportUserData | null) => {
    setSelectedUser(userData);
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
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>

        <Appbar.Header style={style.backArrowStyle}>
          <Appbar.BackAction
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
                <ReportIcon type={reportInfo?.type || ''} isEditView={true} />
                <Text style={style.headerText}>{reportInfo?.name}</Text>
              </TouchableOpacity>
              <View style={style.chartContainer}>
                {reportInfo && <BarChart report={reportInfo} setSelectedUser={updateSelectedUser} />}
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
