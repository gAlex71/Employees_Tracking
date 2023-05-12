import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Card, Row, Form, Space, Typography } from 'antd';
import CustomInput from '../../bricks/CustomInput';
import PasswordInput from '../../bricks/PasswordInput';
import CustomButton from '../../bricks/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';
import { UserData, useLoginMutation } from '../../store/services/auth';
import { errorMessage } from '../../utils/errorMessage';
import ErrorMessage from '../../components/error/ErrorMessage';

const Login = () => {
	const [loginUser, loginUserResult] = useLoginMutation();
	const [error, setError] = useState('');

	const login = async (data: UserData) => {
		try {
			await loginUser(data).unwrap();
		} catch (err) {
			const isError = errorMessage(err);

			if (isError) {
				setError(err.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Вход в аккаунт" style={{ width: '30rem' }}>
					<Form onFinish={login}>
						<CustomInput type="email" name="email" placeholder="Email" />
						<PasswordInput name="password" placeholder="Пароль" />
						<CustomButton type="primary" htmlType="submit">
							Войти
						</CustomButton>
					</Form>

					<Space direction="vertical" size="large">
						<Typography.Text>
							Нет аккаунта? <Link to={Paths.registration}>Зарегистрироваться</Link>
						</Typography.Text>
						<ErrorMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};

export default Login;
