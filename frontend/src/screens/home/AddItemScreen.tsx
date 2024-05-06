import React, {useCallback, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useNavigation,
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {MainTabParamList} from '@/navigations/bottomTab/MainTabNavigator';
import {colors, homeNavigations} from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddItem} from '@/utils';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';

type AddItemScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeNavigations.HOME_ADDITEM
>;

type Navigations = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

export default function AddItemScreen({route}: AddItemScreenProps) {
  const navigation = useNavigation<Navigations>();
  // `route.params`에서 `location` 정보를 받습니다.
  const {location} = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState(location);
  const itemPriceRef = useRef<TextInput | null>(null);
  const itemDescriptionRef = useRef<TextInput | null>(null);
  const addItem = useForm({
    initialValue: {itemName: '', itemPrice: '', itemDescription: ''},
    validate: validateAddItem,
  });

  useFocusEffect(
    useCallback(() => {
      if (route.params?.location) {
        setSelectedLocation(route.params.location);
        console.log('AddItemScreen: focus', route.params.location);
      }
      return () => {
        console.log('AddItemScreen: unmount');
      };
    }, [route]),
  );

  const handleMapPress = () => {
    navigation.navigate(homeNavigations.HOME_MAP);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="물건의 이름을 입력해주세요"
            error={addItem.errors.itemName}
            touched={addItem.touched.itemName}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => itemPriceRef.current?.focus()}
            {...addItem.getTextInputProps('itemName')}
          />
          <InputField
            ref={itemPriceRef}
            placeholder="물건의 가격을 메겨주세요"
            error={addItem.errors.itemPrice}
            touched={addItem.touched.itemPrice}
            returnKeyType="next"
            onSubmitEditing={() => itemDescriptionRef.current?.focus()}
            {...addItem.getTextInputProps('itemPrice')}
          />
          <InputField
            ref={itemDescriptionRef}
            placeholder="물건에 대한 설명을 입력하세요 (선택사항)"
            error={addItem.errors.itemDescription}
            touched={addItem.touched.itemDescription}
            multiline
            returnKeyType="done"
            {...addItem.getTextInputProps('itemDescription')}
          />
          {/* <InputField
            value=""
            disabled
            placeholder="거래 희망 위치를 선택해주세요"
            icon={<Octicons name="location" size={20} color={colors.GREY500} />}
          /> */}
          <Pressable onPress={handleMapPress}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Octicons name="location" size={20} color={colors.GREY500} />
              <Text style={{marginLeft: 10}}>
                {selectedLocation?.name || '거래 희망 위치를 선택해주세요'}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton variant="filled" size="large" label="아이템 추가하기" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 10,
  },
});
