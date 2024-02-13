class WSService {
	isConnected = false;
	socket = null;
	onMessageCallback = null;
	onConnectCallback = null;
	onDisconnectCallback = null;

	initializeSocket = async (socketUrl) => {
		console.log('Socket initialize');
		try {
			if (!socketUrl) {
				console.log('Socket URL is not provided');
				return;
			}
			this.socket = new WebSocket(socketUrl);

			this.socket.onopen = () => {
				this.isConnected = true;
				console.log('Socket connected');

				if (typeof this.onConnectCallback === 'function') {
					this.onConnectCallback();
				}
			};

			this.socket.onmessage = (message) => {
				// console.log('Received message:', message);
				if (typeof this.onMessageCallback === 'function') {
					this.onMessageCallback(message);
				}
			};

			this.socket.onclose = () => {
				this.isConnected = false;
				console.log('Socket disconnected');
				if (typeof this.onDisconnectCallback === 'function') {
					this.onDisconnectCallback();
				}
			};

			this.socket.onerror = (error) => {
				console.log('Socket error:', error);
			};
		} catch (err) {
			console.log('Error initializing socket', err);
		}
	};

	send(data) {
		if (this.isConnected) {
			console.log({ data });
			this.socket.send(JSON.stringify(data));
		} else {
			console.log('Socket is not connected');
		}
	}

	close() {
		if (this.isConnected) {
			this.socket.close();
		} else {
			console.log('Socket is not connected');
		}
	}

	setOnConnectCallback(callback) {
		this.onConnectCallback = callback;
	}

	setOnDisconnectCallback(callback) {
		this.onDisconnectCallback = callback;
	}
	setMessageCallback = (callback) => {
		this.onMessageCallback = callback;
	};
}

const socketService = new WSService();
export default socketService;
