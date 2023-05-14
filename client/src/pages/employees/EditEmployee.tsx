import React, { useState } from 'react';
import { Employee, useEditEmployeeMutation, useGetEmployeeQuery } from '../../store/services/employees';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Row } from 'antd';
import FormEmployee from '../../bricks/FormEmployee';
import { Paths } from '../../paths';
import { errorMessage } from '../../utils/errorMessage';

const EditEmployee = () => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const [error, setError] = useState('');
	const { data, isLoading } = useGetEmployeeQuery(params.id || '');
	const [editEmployee] = useEditEmployeeMutation();

	if (isLoading) return <div>Загрузка...</div>;

	const handleEditEmployee = async (employee: Employee) => {
		try {
			//Перезаписываем data на новые данные
			const editedEmployee = {
				...data,
				...employee,
			};

			await editEmployee(editedEmployee);

			navigate(`${Paths.status}/updated`);
		} catch (error) {
			const handleError = errorMessage(error);

			if (handleError) {
				setError(error.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	return (
		<Layout>
			<Row>
				<FormEmployee
					title="Редактировать сотрудника"
					btnText="Редактировать"
					error={error}
					employee={data}
					onFinish={handleEditEmployee}
				/>
			</Row>
		</Layout>
	);
};

export default EditEmployee;
