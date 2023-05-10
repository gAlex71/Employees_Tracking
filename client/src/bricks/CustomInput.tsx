import React from 'react'
import {Form, Input} from 'antd';

type PropsInput = {
    name: string;
    placeholder: string;
    type?: string;  
};

const CustomInput = ({name, placeholder, type = 'text'}: PropsInput) => {
  return (
    <Form.Item 
        name={name} 
        shouldUpdate
        rules={[{required: true, message: 'Поле обязательно для заполнения'}]}    
    >
        <Input placeholder={placeholder} type={type} size='large'/>
    </Form.Item>
  )
}

export default CustomInput;