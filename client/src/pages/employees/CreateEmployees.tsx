import React, {useState, useEffect} from 'react';
import Layout from '../../components/layout/Layout';
import { Row } from 'antd';
import FormEmployee from '../../bricks/FormEmployee';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { Employee, useAddEmployeeMutation } from '../../store/services/employees';
import { Paths } from '../../paths';
import { errorMessage } from '../../utils/errorMessage';

const CreateEmployees = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation();

    useEffect(() => {
        if(!user) {
            navigate(Paths.login);
        }
    }, [navigate, user]);

	const handleAddEmployee = async (data: Employee) => {
        try {            
            await addEmployee(data).unwrap();

            navigate(`${Paths.status}/created`)
        } catch (error) {
            const handleError = errorMessage(error);

            if(handleError){
                setError(error.data.message);
            }else{
                setError('Неизвестная ошибка');
            }
        }
    };

	return (
		<Layout>
			<Row align="middle" justify="center">
				<FormEmployee 
                    title="Добавить сотрудника" 
                    btnText="Добавить" 
                    onFinish={handleAddEmployee} 
                    error={error}    
                />
			</Row>
		</Layout>
	);
};

export default CreateEmployees;
