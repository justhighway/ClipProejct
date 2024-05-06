import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {alerts} from '@/constants';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permission = isAndroid ? androidPermissions : iosPermissions;

      const checked = await check(permission[type]);

      const showPermissionAlert = () => {
        if (isAndroid) {
          Alert.alert(
            alerts[`${type}_PERMISSION`].TITLE,
            alerts[`${type}_PERMISSION`].MESSAGE,
            [
              {
                text: '설정하기',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '취소',
                style: 'cancel',
              },
            ],
          );
        }
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          await request(permission[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermission;
