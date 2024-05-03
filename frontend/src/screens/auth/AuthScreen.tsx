import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

import {authNavigations, colors} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import AnimatedTitle from '@/components/AnimatedTitle';
import CustomButton from '@/components/CustomButton';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

export default function AuthScreen({navigation}: AuthScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>클립에서,</Text>
        <AnimatedTitle />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그인"
          onPress={() => navigation.navigate(authNavigations.AUTH_SIGNIN)}
        />
        <CustomButton
          label="회원가입"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.AUTH_SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.PURPLE800,
    marginTop: 30,
  },
});
