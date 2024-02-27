import React, { memo, useRef } from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.min.css';
// import { Link } from 'react-router-dom';

function Toast({ img, title, text }) {
	
	return (

		<StyledToast>
			{img && <img src={img} alt="toast" />}
			<div>
				<h3>{title}</h3>
				<p>{text}</p>
			</div>
		</StyledToast>
	);
}

const StyledToast = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	h3 {
		font-size: 14px;
		margin: 0;
		margin-bottom: 5px;
		color: #333;
	}
	p {
		font-size: 14px;
		margin: 0;
	}
	img {
		width: 50px;
	}
`;

export default Toast;
