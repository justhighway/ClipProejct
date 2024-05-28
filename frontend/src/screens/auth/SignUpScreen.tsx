import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateSignUp} from '@/utils';
import {colors} from '@/constants';
import {useAuth} from '@/hooks/queries/useAuth';
import axios from 'axios';

function SignUpScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const [loading, setLoading] = useState(false);
  const {signInMutation, signUpMutation} = useAuth();
  const signUp = useForm({
    initialValue: {username: '', password: '', passwordConfirm: ''},
    validate: validateSignUp,
  });

  const signUpApi = async (username: string, password: string) => {
    try {
      const data = await axios.post(
        'https://15.165.40.73:8080/members/sign-up',
        {
          username,
          password,
        },
      );
      console.log('회원가입 성공', data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleSubmit = () => {
    const {username, password} = signUp.values;
    signUpApi(username, password);
    // setLoading(true); // 시작 시 로딩 상태로 설정
    // signUpMutation.mutate(
    //   {username, password},
    //   {
    //     onSuccess: () => {
    //       signInMutation.mutate(
    //         {username, password},
    //         {
    //           onSuccess: s => {
    //             setLoading(false);
    //             console.log(s);
    //           },
    //           onError: e => {
    //             setLoading(false);
    //             console.log(e);
    //           },
    //         },
    //       );
    //     },
    //     onError: () => setLoading(false),
    //     onSettled: () => {
    //       console.log('회원가입 시도는 함', username, password);
    //     },
    //   },
    // );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signUp.errors.username}
          touched={signUp.touched.username}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signUp.getTextInputProps('username')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signUp.errors.password}
          touched={signUp.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signUp.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signUp.getTextInputProps('passwordConfirm')}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.PURPLE300} />
      ) : (
        <CustomButton label="회원가입" onPress={handleSubmit} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignUpScreen;
