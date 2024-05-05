import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
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
      </View>
      <ScrollView style={styles.listContainer}>
        <Pressable onPress={handleSignOut}>
          <Text>로그아웃</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userProfileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  nameText: {
    fontSize: 20,
    color: colors.BLACK,
  },
});
