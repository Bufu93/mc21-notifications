import { useState } from 'react';
import styled from 'styled-components';

const options = {
	body: 'click',
	icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
	// onсlick: (e) => console.log('Notification clicked'),
};

const notifyUser = async (notificationText = 'Медицинский центр «XXI век»', options) => {
	if (!('Notification' in window)) {
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		const notification = new Notification(notificationText, options);
	} else if (Notification.permission !== 'denied') {
		await Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				const notification = new Notification(notificationText, { ...options, body: '123' });
				// notification.addEventListener('click', options?.onсlick);
			}
		});
	}
};

function App() {
	const [userResponded, setUserResponded] = useState(false);

	const enableNotificationsAndClose = async () => {
		await notifyUser().then(() => {
			setUserResponded(true);
		});
	};

	const disableNotificationsAndClose = async () => {
		setUserResponded(true);
	};

	return (
		<div>
			{!userResponded && Notification.permission !== 'granted' ? (
				<StyledNotificationPermission>
					Notifications:
					<button onClick={enableNotificationsAndClose}>YES</button>
					<button onClick={disableNotificationsAndClose}>NO</button>
				</StyledNotificationPermission>
			) : Notification.permission === 'granted' ? (
				<>
					<div>You have enabled notifications</div>
					<button onClick={() => notifyUser(undefined, options)}>Click to show notification</button>
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
