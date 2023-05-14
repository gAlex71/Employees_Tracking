import React, { useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../store/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from '../../components/layout/Layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { Paths } from '../../paths';
import CustomButton from '../../bricks/CustomButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ErrorMessage from '../../components/error/ErrorMessage';
import { errorMessage } from '../../utils/errorMessage';

const EmployeeInfo = () => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const [error, setError] = useState('');
	const [isModalShow, setModalShow] = useState(false);
	const { data, isLoading } = useGetEmployeeQuery(params.id || '');
	const [removeEmployee] = useRemoveEmployeeMutation();
	const user = useSelector(selectUser);

	if (isLoading) return <div>Загрузка...</div>;

	if (!data) return <Navigate to="/" />;

	const showModal = () => {
		setModalShow(true);
	};

	const hideModal = () => {
		setModalShow(false);
	};

	const deleteEmployee = async () => {
		hideModal();
		try {
			await removeEmployee(data.id).unwrap();

			navigate(`${Paths.status}/deleted`);
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
			<Descriptions title="Информация о сотруднике" bordered>
				<Descriptions.Item label="Имя" span={3}>
					{`${data.firstName} ${data.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item label="Возраст" span={3}>
					{data.age}
				</Descriptions.Item>
				<Descriptions.Item label="Адрес" span={3}>
					{data.address}
				</Descriptions.Item>
			</Descriptions>

			{user?.id === data.userId && (
				<>
					<Divider orientation="left">Действия</Divider>
					<Space>
						<Link to={`${Paths.employeeEdit}/${data.id}`}>
							<CustomButton shape="round" type="default" icon={<EditOutlined />}>
								Редактировать
							</CustomButton>
						</Link>

						<CustomButton shape="round" danger onClick={showModal} icon={<DeleteOutlined />}>
							Удалить
						</CustomButton>
					</Space>
				</>
			)}

			<ErrorMessage message={error} />

			<Modal
				title="Подтвердите удаление"
				open={isModalShow}
				onOk={deleteEmployee}
				onCancel={hideModal}
				okText="Удалить"
				cancelText="Отмена"
			>
				Вы действительно хотите удалить сотрудника?
			</Modal>
		</Layout>
	);
};

export default EmployeeInfo;
