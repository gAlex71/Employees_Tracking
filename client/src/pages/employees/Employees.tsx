import React, {useEffect} from 'react';
import Layout from '../../components/layout/Layout';
import CustomButton from '../../bricks/CustomButton';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useGetAllEmployeesQuery } from '../../store/services/employees';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '../../store/services/employees';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

const columnsTable: ColumnsType<Employee> = [
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
  },
]

const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const {data, isLoading} = useGetAllEmployeesQuery();

  useEffect(() => {
    if(!user){
      navigate(Paths.login);
    }
  }, [navigate, user]);

  const redirectCreateEmployee = () => {
    navigate(Paths.employeeAdd);
  };

	return (
		<Layout>
			<CustomButton type="primary" onClick={redirectCreateEmployee} icon={<PlusCircleOutlined />}>
				Добавить сотрудника
			</CustomButton>
      <Table 
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columnsTable}
        rowKey={(employee) => employee.id}
        onRow={(employee) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${employee.id}`)
          }
        }}
      />
		</Layout>
	);
};

export default Employees;
