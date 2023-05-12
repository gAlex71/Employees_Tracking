import React from 'react';
import { Alert } from 'antd';

type PropsMessage = {
	message?: string;
};

const ErrorMessage = ({ message }: PropsMessage) => {
	if (!message) return null;

	return <Alert message={message} type="error" />;
};

export default ErrorMessage;
