import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineLogSymptomsInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineLogSymptomsInfo'>;
};

export const VaccineLogSymptomsInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { assessmentData } = route.params;

  return (
    <Screen profile={assessmentData.patientData.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('vaccines.log-symptoms.title')}</HeaderText>
      </Header>

      <View style={{ padding: 16 }}>
        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.log-symptoms.body-1')}</RegularText>

        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.log-symptoms.body-2')}</RegularText>

        <RegularText style={{ paddingBottom: 24 }}>{i18n.t('vaccines.log-symptoms.body-3')}</RegularText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});
