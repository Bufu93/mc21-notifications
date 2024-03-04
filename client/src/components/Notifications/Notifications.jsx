import React, { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import Toast from './Toast';

const options = {
	body: 'Очень важное уведомление',
	icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
	onСlick: (e) => console.log('clicked', e),
};

const toastOptions = {
	position: 'bottom-right',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: false,
	theme: 'light',
	toggle: true,
	onClick: options.onСlick,
	transition: Bounce,
};

const notifyUser = async (notificationText = 'Медицинский центр «XXI век»', options) => {
	if (!('Notification' in window)) {
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		const notification = new Notification(notificationText, options);
		notification.addEventListener('click', options?.onСlick);
		console.log({notification})
	} else if (Notification.permission !== 'denied') {
		await Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				console.log('Notification enabled');
				const notification = new Notification(notificationText, {
					...options,
					body: 'Уведомления включены',
					icon: options.icon,
				});
				notification.addEventListener('click', options?.onСlick);
				console.log({notification})
			}
		});
	}

	return Notification.permission;
};

function Notifications() {
	const [isBrowserPush, setIsBrowserPush] = useState(false);
	const [enabledNotify, setEnabledNotify] = useState(false);

	const enableNotificationsAndClose = async () => {
		await notifyUser(undefined, options).then((p) => {
			if (p === 'granted') {
				setIsBrowserPush(true);
				console.log('Notification enabled');
			} else {
				setIsBrowserPush(false);
				toast(
					() =>
						Toast({
							title: 'Медицинский центр «XXI век»',
							text: 'Уведомления включены',
							img: options.icon,
						}),
					toastOptions
				);
			}
		});
	};
	const disableNotificationsAndClose = () => {
		if (enabledNotify) {
			toast(
				() =>
					Toast({
						title: 'Медицинский центр «XXI век»',
						text: 'Уведомления выключены',
						img: options.icon,
					}),
				toastOptions
			);
			setEnabledNotify(false); // Update the state to reflect that notifications are disabled
		}
	};

	const addNotification = async() => {
		if (enabledNotify) {
			if (isBrowserPush) {
				await notifyUser(undefined, options);
			} else {
				toast(
					() =>
						Toast({
							title: 'Медицинский центр «XXI век»',
							text: options.body,
							img: options.icon,
						}),
					toastOptions
				);
			}
		}
		return;
	};

	const onToggleNotifications = (e) => {
		const { checked } = e.target;
		console.log({ checked });
		if (checked) {
			enableNotificationsAndClose();
		} else {
			disableNotificationsAndClose();
		}
		setEnabledNotify(checked);
	};

	return (
		<div>
			<label>
				<input type="checkbox" checked={enabledNotify} onChange={(e) => onToggleNotifications(e)} />
				TOGGLE NOTIFICATIONS
			</label>
			<div>
				<button onClick={addNotification}>add Notification</button>
			</div>
		</div>
	);
}

export default Notifications;
