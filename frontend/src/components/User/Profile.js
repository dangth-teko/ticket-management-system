import React, { Component } from 'react'
import { Table, Card, Button as AntdButton } from 'antd'

const dataSource = []
for (let i = 0; i < 200; ++i) dataSource.push({
    key: i,
    name: "Micheal - " + i,
    age: 20 + Math.round(i/5),
    email: 'mike@ngoknghek.com'
})

class Button extends Component{
    handleClick = () => {
        console.log(this.props.data.text)
    }

    render() {
        return (
            <AntdButton
                className="mx-1"
                data={this.props.data}
                onClick={this.handleClick}
                size="small"
                {...this.props}
            />
        )
    }
}

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 60
}, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 250
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <Button type="primary" data={{ text, record }}>Edit</Button>
            <Button type="danger" data={{ text, record }}>Delete</Button>
        </span>
    ),
    width: 100,
}]

class ProfileTable extends Component {
    state = {
        dataSource: dataSource,
        columns: columns
    }
    render() {
        return (
            <Card className="profile-table">
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns} scroll={{ x: 1000, y: 500 }}
                    bordered={true}
                />

            </Card >
        )
    }
}

export {
    ProfileTable
}
