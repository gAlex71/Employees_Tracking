import React from 'react'
import styles from './Layout.module.css';
import {Layout as AntdLayout} from 'antd';
import Header from '../header/Header';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className={styles.main}>
        <AntdLayout.Content style={{height: '100%'}}>
            <Header />
            {children}
        </AntdLayout.Content>
    </div>
  )
}

export default Layout;