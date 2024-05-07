import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import {colors, conditionMapping, homeNavigations} from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddItem} from '@/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import {Slider} from '@miblanchard/react-native-slider';
import {LatLng} from 'react-native-maps';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

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
  const {location} = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState<LatLng>(location);
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleImagePick = async () => {
    // 이미지 선택 옵션 설정
    const options = {
      mediaType: 'photo', // 사진만 선택
      selectionLimit: 4, // 최대 선택 가능 이미지 수
    };

    // 로컬 갤러리에서 이미지 선택
    const result = await launchImageLibrary(options);

    // 사용자가 이미지를 선택한 경우
    if (!result.didCancel && !result.errorCode) {
      // 선택한 이미지의 URI를 배열에 저장
      const imageUris = result.assets?.map(asset => asset.uri);
      if (imageUris) {
        // 선택한 이미지 URI를 상태에 저장
        setSelectedImages(imageUris);
      }
    }
  };

  const handleItemReorder = (fromIndex: number, toIndex: number) => {
    const newOrder = [...selectedImages];
    const [movedImage] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedImage);
    setSelectedImages(newOrder);
  };

  const handleValueChange = (value: any) => {
    setSliderValue(value);
  };

  // 사용자가 '아이템 추가하기' 버튼을 눌렀을 때 호출되는 함수
  const handleAddItemPress = () => {
    setModalVisible(true);
  };

  // TODO: AddItem API 추가하기
  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate(homeNavigations.HOME_HOME);
  };

  // 모달을 닫고, 추가 작업을 취소합니다.
  const handleCancel = () => {
    setModalVisible(false);
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
            placeholder="물건의 가격을 입력해주세요"
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
          <Text>
            물건의 컨디션을 선택해주세요: {conditionMapping[sliderValue - 1]}
          </Text>
          <Slider
            value={sliderValue}
            minimumValue={1}
            maximumValue={9}
            step={1}
            minimumTrackTintColor={colors.PURPLE600}
            maximumTrackTintColor="#b3b3b3" // 기본값 사용 가능
            thumbTintColor={colors.PURPLE600}
            onValueChange={handleValueChange}
          />
          <Pressable onPress={handleMapPress}>
            <View style={styles.locationContainer}>
              <Octicons name="location" size={20} color={colors.GREY500} />
              <Text style={styles.locationText}>
                {selectedLocation
                  ? `위도: ${selectedLocation.latitude},\n경도: ${selectedLocation.longitude}`
                  : '거래 희망 위치를 선택해주세요'}
              </Text>
            </View>
          </Pressable>
          <ScrollView horizontal style={styles.imageScrollView}>
            <Pressable style={styles.cameraButton} onPress={handleImagePick}>
              <Octicons
                name="device-camera"
                size={30}
                color={colors.PURPLE600}
              />
            </Pressable>
            {selectedImages.map((uri, index) => (
              <Image key={index} source={{uri}} style={styles.image} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* '아이템 추가하기' 버튼을 누르면 모달을 표시 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          variant="filled"
          size="large"
          label="아이템 추가하기"
          onPress={handleAddItemPress}
        />
      </View>

      {/* 모달 컴포넌트 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={handleCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              다음과 같은 아이템을 업로드 할게요!
            </Text>
            <Text>물건 이름: {addItem.values.itemName}</Text>
            <Text>물건 가격: {addItem.values.itemPrice}원</Text>
            <Text>물건 설명: {addItem.values.itemDescription}</Text>
            <Text>물건 컨디션: {conditionMapping[sliderValue - 1]}급</Text>
            <Text>
              거래 희망 장소:{' '}
              {selectedLocation
                ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
                : '미선택'}
            </Text>
            <Text>물건 사진: 대표 사진 외 {selectedImages.length}장</Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable style={styles.modalButton} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>네</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>아니오</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.GREY200,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  locationText: {
    marginLeft: 10,
    color: colors.GREY700,
  },
  cameraButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GREY200,
    borderRadius: 10,
    marginRight: 10,
  },
  imageScrollView: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  // 모달 스타일
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.PURPLE600,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
