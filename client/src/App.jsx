import { useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import List from './components/pages/List';
import { JoinChat } from './services/fetch';
import socketService from './services/socketService';

import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import Notifications from './components/Notifications/Notifications';

const sessionkey = 'tgj6s47vB1iexxCCAmDmP4fO';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({});
	const [line, setLine] = useState(null);

	const recorder = () => {
		socketService.setMessageCallback(socketResponse);
	};

	const socketResponse = (lines) => {
		const parsedData = JSON.parse(lines.data);
		console.log(parsedData);
		setData((prev) => ({
			...prev,
			notification: parsedData.type === 'notification' ? parsedData.notification : prev.notification,
			counters: parsedData.type === 'counters' ? parsedData.counters : prev.counters,
			openLines: parsedData.type === 'openLines' ? parsedData.lines : prev.openLines,
		}));
	};

	console.log({ data });

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
	}, [socketService?.isConnected]);

	return (
		<div>
			{isLoading ? <List data={data} /> : <p>Loading...</p>}
			<Notifications />
			<NotificationCenter />
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</div>
	);
}

export default App;
