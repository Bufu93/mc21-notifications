import React from 'react';
import styled from 'styled-components';

function List({ data }) {
	return (
		<StyledWrapper>
			<StyledList>
				{data?.openLines.map((item) => {
					return <li key={item.id}>{item.name}</li>;
				})}
			</StyledList>
			<StyledList>
				{data?.counters.map((item) => {
					return (
						<li key={item.id}>
							{item.key}
							<b>{item.count}</b>
						</li>
					);
				})}
			</StyledList>
			<StyledList>
				{data.notification && (
					<>
						<li>createdAt:{data.notification.createdAt}</li>
						<li>delivered:{data.notification.delivered}</li>
						<li>id:{data.notification.id}</li>
						<li>notificationType:{data.notification.notificationType}</li>
						<li>icon:{data.notification.notification.icon}</li>
						<li>link:{data.notification.notification.link}</li>
						<li>message:{data.notification.notification.message}</li>
					</>
				)}
			</StyledList>
		</StyledWrapper>
	);
}

const StyledList = styled.div`
	border: 1px solid black;
	padding: 20px;
`;
const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
`;

export default List;
