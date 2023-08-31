import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppState, NativeEventSubscription } from 'react-native';
import PushNotification from 'react-native-push-notification';

let subscription: NativeEventSubscription;

const _handleAppStateChange = (nextAppState: string) => {
	if (nextAppState === 'active') {
		_registerLocalNotification();
	}
};

const _registerLocalNotification = () => {
	PushNotification.setApplicationIconBadgeNumber(0);
	PushNotification.cancelAllLocalNotifications();


	const time = new Date();
	time.setHours(18, 0, 0, 0);

	PushNotification.localNotificationSchedule({
		/* Android Only Properties */
		vibrate: true,
		vibration: 300,
		priority: 'default',
		visibility: 'public',
		importance: 'default',

		/* iOS and Android properties */
		message: '오늘 공부는 완료하셨나요?',
		playSound: false,
		number: 1,

		// for production
		repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
		date: time,
	});
};

export default {
	register: () => {
		PushNotification.configure({
			onNotification: function(notification) {
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			popInitialNotification: true,
		});

		_registerLocalNotification();

		subscription = AppState.addEventListener('change', _handleAppStateChange);
	},
	unregister: () => {
		PushNotification.cancelAllLocalNotifications();
		subscription?.remove();
	},
};