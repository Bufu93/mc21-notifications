import { Check, Trash2 } from 'react-feather';
import styled from 'styled-components';
import { PulsatingDot } from './PulsatingDot';

export function ItemActions({ notification, markAsRead, remove }) {
	return (
		<Wrapper>
			{notification.read ? (
				<Check color="green" />
			) : (
				<Button
					title="Отметить как прочитанное"
					onClick={() => {
						markAsRead(notification.id);
					}}
				>
					<PulsatingDot />
				</Button>
			)}
			<Button onClick={() => remove(notification.id)} title="Удалить">
				<Trash2 color="#666" />
			</Button>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin-left: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const Button = styled.button`
	cursor: pointer;
	border: none;
	outline: none;
	background: transparent;
`;
