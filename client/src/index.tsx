import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider, theme } from 'antd';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from './paths';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Auth from './features/auth/Auth';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <div>Home</div>,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.registration,
		element: <Registration />,
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
