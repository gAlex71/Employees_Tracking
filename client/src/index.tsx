import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider, theme } from 'antd';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from './paths';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Auth from './features/auth/Auth';
import Employees from './pages/employees/Employees';
import CreateEmployees from './pages/employees/CreateEmployees';
import Status from './bricks/Status';
import EmployeeInfo from './pages/employees/EmployeeInfo';
import EditEmployee from './pages/employees/EditEmployee';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Employees />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.registration,
		element: <Registration />,
	},
	{
		path: Paths.employeeAdd,
		element: <CreateEmployees />,
	},
	{
		path: `${Paths.status}/:status`,
		element: <Status />,
	},
	{
		path: `${Paths.employee}/:id`,
		element: <EmployeeInfo />,
	},
	{
		path: `${Paths.employeeEdit}/:id`,
		element: <EditEmployee />,
	},
]);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					algorithm: theme.darkAlgorithm,
				}}
			>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
