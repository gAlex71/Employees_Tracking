import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Result, Row } from 'antd';

const Statuses: Record<string, string> = {
    created: 'Сотрудник успешно создан',
    updated: 'Сотрудник успешно обновлен',
    deleted: 'Сотрудник успешно удален',
}

const Status = () => {
    const {status} = useParams();

  return (
    <Row align="middle" justify="center">
        <Result 
            status={status ? 'success' : 404}
            title={status ? Statuses[status] : 'Не найдено'}
            extra={
                <Button key="dashboard">
                    <Link to='/'>На главную</Link>
                </Button>
            }
        />
    </Row>
  )
}

export default Status;