import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import CalendarPicker from '@covid/components/CalendarPicker';
import { RegularText, SecondaryText, ErrorText } from '@covid/components/Text';
import { colors } from '@theme';
import { VaccineRequest, VaccineBrands } from '@covid/core/vaccine/dto/VaccineRequest';
import { CalendarIcon } from '@assets';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { isGBCountry, isUSCountry } from '@covid/core/localisation/LocalisationService';

import { VaccineNameQuestion } from './VaccineNameQuestion';

export interface VaccineDoseData {
  firstDoseDate: Date | undefined;
  firstBatchNumber: string | undefined;
  firstBrand: VaccineBrands | undefined;
  firstDescription: string | undefined;
  secondDoseDate: Date | undefined;
  secondBatchNumber: string | undefined;
  secondBrand: VaccineBrands | undefined;
  secondDescription: string | undefined;
}

interface Props {
  formikProps: FormikProps<VaccineDoseData>;
  firstDose: boolean;
}

export interface VaccineDoseQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
}

export const VaccineDoseQuestion: VaccineDoseQuestion<Props, VaccineDoseData> = (props: Props) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();
  const [showPicker, setshowPicker] = useState(false);
  const [errorMessage] = useState<string>('');

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setDoseDate(selectedDate: Moment): void {
    if (props.firstDose) {
      formikProps.values.firstDoseDate = convertToDate(selectedDate);
    } else {
      formikProps.values.secondDoseDate = convertToDate(selectedDate);
    }
    setshowPicker(false);
  }

  const renderPicker = () => {
    const dateField: Date | undefined = props.firstDose
      ? formikProps.values.firstDoseDate
      : formikProps.values.secondDoseDate;

    let countrySpecificMinDate: Date | undefined;
    if (isGBCountry()) {
      countrySpecificMinDate = new Date('2020-12-08');
    }
    if (isUSCountry()) {
      countrySpecificMinDate = new Date('2020-12-11');
    }
    if (!props.firstDose) {
      countrySpecificMinDate = formikProps.values.firstDoseDate;
    }

    return (
      <CalendarPicker
        onDateChange={setDoseDate}
        initialDate={dateField}
        selectedStartDate={dateField}
        maxDate={today}
        minDate={countrySpecificMinDate}
      />
    );
  };

  const renderCalenderButton = () => {
    const dateField: Date | undefined = props.firstDose
      ? formikProps.values.firstDoseDate
      : formikProps.values.secondDoseDate;
    const errorField: string | undefined = props.firstDose
      ? formikProps.errors.firstDoseDate
      : formikProps.errors.secondDoseDate;

    return (
      <>
        <TouchableOpacity onPress={() => setshowPicker(true)} style={styles.dateBox}>
          <CalendarIcon />
          {dateField ? (
            <RegularText style={{ marginStart: 8 }}>{moment(dateField).format('MMMM D, YYYY')}</RegularText>
          ) : (
            <RegularText style={{ marginStart: 8 }}>{i18n.t('vaccines.your-vaccine.select-date')}</RegularText>
          )}
        </TouchableOpacity>
        <ErrorText>{errorField ? 'Date is required' : ''}</ErrorText>
      </>
    );
  };

  const renderBatchNumber = () =>
    props.firstDose ? (
      <ValidatedTextInput
        placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
        value={props.formikProps.values.firstBatchNumber}
        onChangeText={props.formikProps.handleChange('firstBatchNumber')}
        onBlur={props.formikProps.handleBlur('firstBatchNumber')}
        returnKeyType="next"
        error={formikProps.touched.firstBatchNumber && formikProps.errors.firstBatchNumber}
        onSubmitEditing={() => {}}
      />
    ) : (
      <ValidatedTextInput
        placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
        value={props.formikProps.values.secondBatchNumber}
        onChangeText={props.formikProps.handleChange('secondBatchNumber')}
        onBlur={props.formikProps.handleBlur('secondBatchNumber')}
        returnKeyType="next"
        error={formikProps.touched.secondBatchNumber && formikProps.errors.secondBatchNumber}
        onSubmitEditing={() => {}}
      />
    );

  const renderNameError = () => {
    if (formikProps.submitCount == 0 || !!Object.keys(formikProps.errors).length) {
      return null;
    }
    if (props.firstDose && (formikProps.errors.firstBrand || formikProps.errors.firstDescription)) {
      return <ValidationError error={i18n.t('validation-error-text')} />;
    }
    if (!props.firstDose && (formikProps.errors.secondBrand || formikProps.errors.secondDescription)) {
      return <ValidationError error={i18n.t('validation-error-text')} />;
    }
    return null;
  };

  return (
    <>
      <View style={{ marginBottom: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <VaccineNameQuestion formikProps={formikProps as FormikProps<VaccineDoseData>} firstDose={props.firstDose} />
          {renderNameError}
        </View>
        <SecondaryText>{i18n.t('vaccines.your-vaccine.when-injection')}</SecondaryText>
        {showPicker ? renderPicker() : renderCalenderButton()}
      </View>
      <RegularText>{i18n.t('vaccines.your-vaccine.label-batch')}</RegularText>
      {renderBatchNumber()}
    </>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    marginVertical: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 16,
  },
});

VaccineDoseQuestion.schema = () => {
  return Yup.object().shape({
    firstDoseDate: Yup.date().required(),
    secondDoseDate: Yup.date(),
    firstBatchNumber: Yup.string().nullable(),
    secondBatchNumber: Yup.string().nullable(),
    firstBrand: Yup.string().nullable(),
    firstDescription: Yup.string().nullable(),
    secondBrand: Yup.string().nullable(),
    secondDescription: Yup.string().nullable(),
  });
};
