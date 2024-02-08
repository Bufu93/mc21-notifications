import { useState } from 'react';
import styled from 'styled-components';

const options = {
	body: 'click',
	icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
	// onсlick: (e) => console.log('Notification clicked'),
	// сlose: (e) => console.log(e),
};

const notifyUser = async (notificationText = 'Thank you for enabling notifications!', options) => {
	if (!('Notification' in window)) {
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				const notification = new Notification(notificationText, options);
				// notification.addEventListener('click', () );
				notification.addEventListener('close', (e) => {
					console.log({ e });
				}); // Добавить слушатель события close
				console.log({ notification });
			}
		});
		// } else if (Notification.permission === 'denied' || Notification.permission === 'default') {
		// 	await Notification.requestPermission().then((permission) => {
		// 		if (permission === 'granted') {
		// 			const notification = new Notification(notificationText, options);
		// 			notification.addEventListener('click', options?.onсlick);
		// 			notification.addEventListener('close', options?.onсlose); // Добавить слушатель события close
		// 			console.log({ notification });
		// 		}
		// 	});
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
		await notifyUser().then(() => {
			setUserResponded(true);
		});
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
					<button onClick={() => notifyUser('First notification message', options)}>Click to show notification</button>
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
