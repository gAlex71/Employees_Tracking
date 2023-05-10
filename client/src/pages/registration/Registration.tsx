import React from 'react';
import Layout from '../../components/layout/Layout';
import { Card, Row, Form, Space, Typography } from 'antd';
import CustomInput from '../../bricks/CustomInput';
import PasswordInput from '../../bricks/PasswordInput';
import CustomButton from '../../bricks/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const Registration = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Регистрация" style={{ width: '30rem' }}>
					<Form onFinish={() => null}>
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
				</Card>
			</Row>
		</Layout>
	);
};

export default Registration;
