import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateSignIn} from '@/utils';
import {useAuth} from '@/hooks/queries/useAuth';

function SignInScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const {signInMutation} = useAuth();
  const signIn = useForm({
    initialValue: {username: '', password: ''},
    validate: validateSignIn,
  });

  const handleSubmit = () => {
    signInMutation.mutate(signIn.values, {
      onSuccess: () => console.log('로그인 성공'),
      onError: error => console.log(error),
      onSettled: () => console.log('로그인 시도'),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signIn.errors.username}
          touched={signIn.touched.username}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signIn.getTextInputProps('username')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={signIn.errors.password}
          touched={signIn.touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signIn.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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

export default SignInScreen;
