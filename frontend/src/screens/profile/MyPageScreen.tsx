import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants';

export default function MyPageScreen() {
  const {getProfileQuery, signOutMutation} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const handleSignOut = () => {
    signOutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfileContainer}>
        <View style={styles.userImageContainer}>
          {imageUri === null && kakaoImageUri === null && (
            <Image
              source={require('@/assets/user-default.png')}
              style={styles.userImage}
            />
          )}
          {imageUri === null && !!kakaoImageUri && (
            <Image source={{uri: kakaoImageUri}} style={styles.userImage} />
          )}
          {imageUri !== null && (
            <Image source={{uri: imageUri}} style={styles.userImage} />
          )}
        </View>
        <Text style={styles.nameText}>{nickname ?? email}</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <Pressable style={styles.listBox}>
          <Text style={styles.listText}>물건 내역 관리</Text>
        </Pressable>
        <Pressable style={styles.listBox}>
          <Text style={styles.listText}>거래 후기</Text>
        </Pressable>
        <Pressable style={styles.listBox}>
          <Text style={styles.listText}>알림 설정</Text>
        </Pressable>
        <Pressable style={styles.listBox} onPress={handleSignOut}>
          <Text style={styles.listText}>로그아웃</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  userProfileContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY500,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  listBox: {
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY500,
    padding: 20,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  editProfileButton: {
    backgroundColor: colors.PURPLE500,
    padding: 7,
    borderRadius: 18,
  },
  nameText: {
    fontSize: 20,
    color: colors.GREY800,
    marginBottom: 8,
  },
  editProfileText: {
    fontSize: 12,
    color: colors.WHITE,
  },
  listText: {
    fontSize: 20,
    color: colors.GREY800,
  },
});
