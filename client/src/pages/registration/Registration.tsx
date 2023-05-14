import React, {useState} from 'react';
import Layout from '../../components/layout/Layout';
import { Card, Row, Form, Space, Typography } from 'antd';
import CustomInput from '../../bricks/CustomInput';
import PasswordInput from '../../bricks/PasswordInput';
import CustomButton from '../../bricks/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { User, useRegistrationMutation } from '../../store/services/auth';
import { errorMessage } from '../../utils/errorMessage';
import ErrorMessage from '../../components/error/ErrorMessage';

type RegistrationData = Omit<User, 'id'> & {ConfirmPassword: string};

const Registration = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [error, setError] = useState('');
	const [registerUser] = useRegistrationMutation();

	const registration = async (data: RegistrationData) => {
		try {
			await registerUser(data).unwrap();

			navigate(Paths.home);
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
				<Card title="Регистрация" style={{ width: '30rem' }}>
					<Form onFinish={registration}>
						<CustomInput name="name" placeholder="Имя" />
						<CustomInput type="email" name="email" placeholder="Email" />
						<PasswordInput name="password" placeholder="Пароль" />
						<PasswordInput name="confirmPassword" placeholder="Подтвердите пароль" />
						<CustomButton type="primary" htmlType="submit">
							Зарегистрироваться
						</CustomButton>
					</Form>

					<Space direction="vertical" size="large">
						<Typography.Text>
							Уже зарегистрированы? <Link to={Paths.login}>Войти</Link>
						</Typography.Text>
					</Space>

					<ErrorMessage message={error} />
				</Card>
			</Row>
		</Layout>
	);
};

export default Registration;
