import React from 'react';
import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type PropsPassword = {
	name: string;
	placeholder: string;
	dependencies?: NamePath[];
};

const PasswordInput = ({ name, placeholder, dependencies }: PropsPassword) => {
	return (
		<Form.Item
			name={name}
			dependencies={dependencies}
			hasFeedback
			rules={[
				{
					required: true,
					message: 'Поле обязательно для заполнения',
				}, ({ getFieldValue }) => ({
                    validator(_, value) {
                        if(!value){
                            return Promise.resolve();
                        }

                        if(name === 'confirmPassword'){
                            if(!value || getFieldValue(("password")) === value){
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Пароли не совпадают'));
                        } else {
                            if(value.length < 5){
                                return Promise.reject(new Error('Пароль должен содержать не менее 6 символов'));
                            }

                            return Promise.resolve();
                        }
                    }
                })
			]}
		>
            <Input.Password placeholder={placeholder} size='large' />
        </Form.Item>
	);
};

export default PasswordInput;