import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import {
  BrandedButton,
  ClickableText,
  Header3Text,
  HeaderText,
  RegularText,
  SecondaryText,
} from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors, fontStyles } from '@theme';
import { dietStudyPlaybackFoodHeader } from '@assets';
import { DoctorSpeechCard } from '@covid/features/diet-study-playback/DoctorSpeechCard';
import { openWebLink } from '@covid/utils/links';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackDietQuality'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackDietQuality'>;
};

export const DietStudyPlaybackDietQualityScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.scrollView]}>
        <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
        <Image style={styles.banner} source={dietStudyPlaybackFoodHeader} />
        <View style={styles.rootContainer}>
          <HeaderText style={styles.titleText}>Diet quality impacts our long-term health</HeaderText>
          <SecondaryText style={styles.subtext}>
            {'We have spent our careers studying nutrition because it is central to long-term health.\n\n' +
              'Low diet quality is linked to bad health, including an increased risk of chronic diseases, including type 2 diabetes and heart disease.\n\n' +
              'Many nutrients are needed in appropriate amounts to support long-term health including a well-functioning immune system. That’s why a healthy and varied diet - rather than focusing on single nutrients or supplements - is key.'}
          </SecondaryText>

          <DoctorSpeechCard>
            <Header3Text style={{ marginBottom: 20 }}>
              We have analyzed your diet in two ways to help you understand how your diet can help you maintain
              long-term health.
            </Header3Text>
            <RegularText>
              First we will show you your Traditional Diet Quality Score. We used a scientifically validated method* to
              understand your overall diet quality before and during the pandemic.
            </RegularText>

            <ClickableText
              style={{ ...fontStyles.bodySmallLight, color: colors.purple }}
              onPress={() => openWebLink('https://covid.joinzoe.com/us-post/covid-diet-feedback')}>
              {'\n'}* Learn more about the Short Form FFQ tool developed by Cleghorn et al. that we used in this blog.
            </ClickableText>
          </DoctorSpeechCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            See my Traditional Diet Quality Score
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    paddingHorizontal: 16,
  },
  navContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 30,
    zIndex: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.darkblue,
    marginTop: 32,
    marginBottom: 8,
    color: colors.brand,
  },
  banner: {
    width: '100%',
    aspectRatio: 1.6806722689 / 1,
    height: undefined,
    resizeMode: 'contain',
  },
  titleText: {
    marginVertical: 16,
  },
  subtext: {
    marginBottom: 16,
  },
  subtitle: {
    marginVertical: 16,
  },
});
