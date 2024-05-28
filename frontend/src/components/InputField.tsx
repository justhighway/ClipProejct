import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  Pressable,
} from 'react-native';
import {colors} from '@/constants';
import {mergeRefs} from '@/utils/common';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {disabled = false, error, touched, icon = null, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    // Pressable 영역을 클릭하면 TextInput에 focus가 갈 수 있도록 처리
    const innerRef = useRef<TextInput | null>(null);
    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
            props.multiline && styles.multiline,
          ]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(ref, innerRef) : innerRef}
              editable={!disabled}
              placeholderTextColor={colors.GREY500}
              style={[styles.input, disabled && styles.disabled]}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              {...props}
            />
          </View>
          {touched && Boolean(error) && (
            <Text style={styles.textError}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GREY400,
    padding: deviceHeight > 700 ? 15 : 10,
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    fontSize: 16,
    color: colors.GREY900,
    padding: 0,
    borderRadius: 20,
  },
  multiline: {
    paddingBottom: deviceHeight > 700 ? 65 : 40,
  },
  disabled: {
    backgroundColor: colors.GREY200,
    color: colors.GREY500,
  },
  textError: {
    fontSize: 12,
    paddingTop: 5,
    color: colors.RED300,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED300,
  },
});

export default InputField;
