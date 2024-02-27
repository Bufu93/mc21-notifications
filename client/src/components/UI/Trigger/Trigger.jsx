import { Bell } from 'react-feather';
import styled from 'styled-components';

export function Trigger({ count, onClick }) {
	return (
		<Wrapper onClick={onClick}>
			<Bell color="#333" />
			<span>{count}</span>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: inline-block;
	color: #fff;
	&:hover {
		cursor: pointer;
	}
	span {
		position: absolute;
		top: -8px;
		right: -8px;
		background: #82bf31;
		border-radius: 50%;
		width: 22px;
		height: 22px;
		display: flex;
		justify-content: center;
		align-items: baseline;
	}
`;
