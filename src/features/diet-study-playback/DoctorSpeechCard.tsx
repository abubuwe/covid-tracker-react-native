import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { BasicCard } from '@covid/components/Cards/BasicCard';
import { doctorsAvatars, QuoteMarks } from '@assets';

type CardProps = {
  children: React.ReactNode;
  cardStyle?: object;
};

export const DoctorSpeechCard: React.FC<CardProps> = (c) => {
  return (
    <View style={{ paddingTop: 45 }}>
      <BasicCard style={c.cardStyle}>
        <View style={styles.quoteIcon}>
          <QuoteMarks />
        </View>
        {c.children}
      </BasicCard>
      <View style={{ position: 'absolute', elevation: 5, backgroundColor: 'transparent' }}>
        <Image style={styles.avatar} source={doctorsAvatars} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteIcon: {
    marginBottom: 16,
    marginTop: 32,
  },
  avatar: {
    resizeMode: 'contain',
    height: undefined,
    width: 120,
    marginTop: 16,
    aspectRatio: 1.8,
  },
});
