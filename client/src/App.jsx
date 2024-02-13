import { useEffect, useState } from 'react';
import styled from 'styled-components';
import socketService from './services/socketService';
import { JoinChat } from './services/fetch';
import List from './components/pages/List';

const sessionkey = 'tgj6s47vB1iexxCCAmDmP4fO';

const options = {
	body: 'Очень важное уведомление',
	icon: 'https://mc21.ru/lk/static/media/logo.b902c3da117162aa84f03ae2f8a54f1c.svg',
	onСlick: (e) => console.log('e'),
};

const notifyUser = async (notificationText = 'Медицинский центр «XXI век»', options) => {
	if (!('Notification' in window)) {
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		const notification = new Notification(notificationText, options);
		notification.addEventListener('click', options?.onСlick);
	} else if (Notification.permission !== 'denied') {
		await Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				const notification = new Notification(notificationText, { ...options, body: '123' });
				notification.addEventListener('click', options?.onСlick);
			}
		});
	}
};

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [openLines, setOpenLines] = useState([]);
	const [line, setLine] = useState(null);
	const [userResponded, setUserResponded] = useState(false);
	const enableNotificationsAndClose = async () => {
		await notifyUser().then(() => {
			setUserResponded(true);
		});
	};
	const disableNotificationsAndClose = async () => {
		setUserResponded(true);
	};

	const recorder = () => {
		socketService.setMessageCallback(socketResponse);
	};

	const socketResponse = (lines) => {
		// Process the received message

		const parcedData = JSON.parse(lines.data);
		console.log(parcedData);
		if (parcedData && parcedData.type === 'notification' && parcedData.notification) {
			setIsLoading(false);
			// setOpenLines(parcedData.lines);
		}
	};

	const getNotification = () => {
		console.log('getNotification');
		socketService.send({
			type: 'getNotification',
			message: { id: '1', page: 1 },
		});
	};

	useEffect(() => {
		const initializeSocket = async () => {
			setIsLoading(true);
			const socketUrl = await JoinChat(sessionkey)().catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
			if (socketUrl) {
				socketService.initializeSocket(socketUrl);
			}
			recorder();
		};

		initializeSocket();

		// Invoke the JoinChat function and log the result
	}, []);

	useEffect(() => {
		if (socketService.isConnected) {
			getNotification();
		}
	}, [socketService.isConnected]);

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
			<button onClick={getNotification}>Get notification</button>
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
