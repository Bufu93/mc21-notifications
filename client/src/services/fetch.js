export const JoinChat = (sessionkey) => {
	return async () => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				sessionkey: sessionkey,
			},
		};

		const response = await fetch('https://api.mc21.ru/lk/v1/chats/join', requestOptions);
		const data = await response.json(); // Add await keyword here
		console.log(data);
		if (data.authState === 'OK' && data.result.wss) {
			return data.result.wss;
		} else {
			throw new Error('Ошибка при получении списка открытых линий');
		}
	};
};
