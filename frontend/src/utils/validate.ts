type UserInfomation = {
  email: string;
  password: string;
};

function validateUser(values: UserInfomation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateSignIn(values: UserInfomation) {
  return validateUser(values);
}

function validateSignUp(values: UserInfomation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지않습니다.';
  }

  return signupErrors;
}

function validateAddItem(values: {
  itemName: string;
  itemPrice: string;
  itemDescription: string;
}) {
  const errors = {
    itemName: '',
    itemPrice: '',
    itemDescription: '',
  };

  if (values.itemName.trim() === '') {
    errors.itemName = '물건의 이름은 1~30자 이내로 입력해주세요.';
  }
  if (values.itemPrice.trim() === '') {
    errors.itemPrice = '물건의 가격은 필수입니다.';
  }

  return errors;
}

export {validateSignIn, validateSignUp, validateAddItem};
