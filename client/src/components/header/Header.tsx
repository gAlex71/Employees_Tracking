import React from 'react';
import styles from './Header.module.css';
import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import CustomButton from '../../bricks/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const Header = () => {
	return (
		<Layout.Header className={styles.header}>
			<Space>
				<TeamOutlined className={styles.teamIcon} />
				<Link to={Paths.home}>
					<CustomButton type="ghost">
						<Typography.Title level={1}>Сотрудники</Typography.Title>
					</CustomButton>
				</Link>
			</Space>

      <Space>
        <Link to={Paths.login}>
          <CustomButton type="ghost" icon={<UserOutlined />}>Войти</CustomButton>
        </Link>
        <Link to={Paths.registration}>
          <CustomButton type="ghost" icon={<LoginOutlined />}>Зарегистрироваться</CustomButton>
        </Link>
      </Space>
		</Layout.Header>
	);
};

export default Header;
