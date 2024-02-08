import { useState } from 'react';
import styled from 'styled-components';

const options = {
	body: 'click',
	icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
	onсlick: () => console.log('Notification clicked'),
};
const defaultOptions = {
	body: 'click',
	icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
	onсlick: () => console.log('Notification clicked'),
};

const notifyUser = async (notificationText, options) => {
	if (!('Notification' in window)) {
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted' || Notification.permission === 'default') {
		await Notification.requestPermission().then((permission) => {
			console.log({ bottom: permission });
			if (permission === 'granted') {
				const notification = new Notification(notificationText, options);
				notification.addEventListener('click', options?.onсlick);
			}
		});
	} else if (Notification.permission === 'denied') {
		await Notification.requestPermission().then((permission) => {
			console.log({ bottom: permission });
			if (permission === 'denied') {
				const notification = new Notification(notificationText, options);
				notification.addEventListener('error', (e) => console.log(e));
				notification.addEventListener('click', options?.onсlick);
			}
		});
	}
};

function App() {
	const [userResponded, setUserResponded] = useState(false);

	const enableNotificationsAndClose = async () => {
		await notifyUser('Медицинский центр «XXI век»', {
			body: 'Вы подписались на уведомления',
			icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
		}).then(() => {
			setUserResponded(true);
		});
	};

	const disableNotificationsAndClose = async () => {
		await notifyUser('Медицинский центр «XXI век»', {
			body: 'Вы отписались от уведомлений',
			icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
		}).then(() => {
			setUserResponded(true);
		});
	};

	return (
		<div>
			{Notification.permission === 'granted' ? (
				<>
					<StyledNotificationPermission>
						Notifications:
						<button onClick={enableNotificationsAndClose}>YES</button>
						<button onClick={disableNotificationsAndClose}>NO</button>
					</StyledNotificationPermission>

					<>
						<div>You have enabled notifications</div>
						<button onClick={() => notifyUser('First notification message', options)}>
							Click to show notification
						</button>
					</>
				</>
			) : (
				<div>You have disabled notifications</div>
			)}
		</div>
	);
}

const StyledNotificationPermission = styled.div`
	border: 1px solid #000;
	padding: 20px 40px;
	display: flex;
	gap: 40px;
`;

export default App;
