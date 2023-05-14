import React from 'react';
import { Employee } from '../store/services/employees';
import { Card, Form, Space } from 'antd';
import CustomInput from './CustomInput';
import ErrorMessage from '../components/error/ErrorMessage';
import CustomButton from './CustomButton';

type Props<T> = {
	title: string;
	btnText: string;
	onFinish: (values: T) => void;
	error?: string;
	employee?: T;
};

const FormEmployee = ({ title, btnText, onFinish, error, employee }: Props<Employee>) => {
	return (
		<Card title={title} style={{ width: '30rem' }}>
			<Form name="employee-form" onFinish={onFinish} initialValues={employee}>
                <CustomInput type="text" name="firstName" placeholder='Имя'/>
                <CustomInput type="text" name="lastName" placeholder='Фамилия'/>
                <CustomInput type="number" name="age" placeholder='Возраст'/>
                <CustomInput type="text" name="address" placeholder='Адрес'/>
                <Space>
                    <ErrorMessage message={error}/>
                    <CustomButton htmlType='submit'>
                        {btnText}
                    </CustomButton>
                </Space>
            </Form>
		</Card>
	);
};

export default FormEmployee;
