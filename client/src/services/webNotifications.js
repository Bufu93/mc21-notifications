export const notifyUser = async (notificationText = 'Медицинский центр «XXI век»', options) => {
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