import React from 'react';
import Layout from '../../components/layout/Layout';
import { Card, Row, Form, Space, Typography } from 'antd';
import CustomInput from '../../bricks/CustomInput';
import PasswordInput from '../../bricks/PasswordInput';
import CustomButton from '../../bricks/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const Login = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Вход в аккаунт" style={{ width: '30rem' }}>
					<Form onFinish={() => null}>
						<CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль"/>
            <CustomButton type='primary' htmlType='submit'>
              Войти
            </CustomButton>
					</Form>

          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.registration}>Зарегистрироваться</Link>
            </Typography.Text>
          </Space>
				</Card>
			</Row>
		</Layout>
	);
};

export default Login;
