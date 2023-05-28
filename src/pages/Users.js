import React, {useEffect, useState} from 'react';
import {Button, message, Table} from "antd";
import {deleteUserApi, getUserMe, getUsersApi, updateUserStatus} from "../api/config/users";
import {DeleteOutlined, LockOutlined, LogoutOutlined, UnlockOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {TOKEN_ACCESS} from "../api/host";


const timeConverter = (time) =>{
    let date = time.split("T")[0]
    let t = time.split("T")[1]
    return `${t.split(".")[0]}, ${date}`
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: "Last login",
        dataIndex: "last_login_time",
        render: (time)=> timeConverter(time)
    },
    {
        title: "Registration time",
        dataIndex: "registration_time",
        render: (time)=> timeConverter(time)
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (status) => status === "active" ? <span style={{color:"#00A000"}}>{status.toUpperCase()}</span> : <span style={{color:"#FF4F4D"}}>{status.toUpperCase()}</span>
    }
];


function Users(props) {

    const [users, setUsers] = useState([])
    const [selectedRows, setSelectedRows] = useState([])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows)
            console.log(selectedRows, userMe)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [actionLoading, setActionLoading] = useState(false)

    const changeStatus = (status) =>{
        setActionLoading(true)
        console.log(selectedRows)
        Promise.all(selectedRows.map(item=>{
            return updateUserStatus(item.id, status)
        })).then(res=>{
            message.success("Users status updated successfully")
            if(status === "blocked"){
                if(selectedRows.find(item=>item.id === userMe.id)){
                    message.warning("You blocked yourself")
                    logout()
                }
            }
            setSelectedRows([])
            getUsers()
        })
            .catch(()=>{
                setActionLoading(false)
                message.error("Something went wrong")
            })
    }

    const getUsers = () =>{
        getUsersApi().then(res=>{
            let usersData = []
            res.data.forEach(item=>{
                usersData.push({
                    key: item.id,
                    ...item
                })
            })
            setUsers(usersData)
            setActionLoading(false)
        })
            .catch(err=>{
                message.error("Something went wrong or network error")
                console.log(err)
                setActionLoading(false)
            })
    }

    const logout = () =>{
        localStorage.removeItem(TOKEN_ACCESS)
        navigate("/login")
    }
    const navigate = useNavigate()
    const deleteUser = () =>{
        setActionLoading(true)
        Promise.all(selectedRows.map(item=>{
            return deleteUserApi(item.id)
        })).then(res=>{
            message.success("Users deleted successfully")
            if(selectedRows.find(item=>item.id === userMe.id)){
                message.warning("You deleted yourself")
                logout()
            }
            getUsers()
            setSelectedRows([])
        })
            .catch(()=>{
                setActionLoading(false)
                message.error("Something went wrong")
            })

    }

    const [userMe, setUserMe] = useState({})
    useEffect(()=>{
        getUserMe().then(res=>{
            console.log(res.data)
            setUserMe(res.data)
        })
        getUsers()
    },[])
    return (
        <div>
            <div className="d-flex justify-content-between align-items-end px-5">
                <div></div>
                <h3 className="text-center mt-4">Hello <span style={{color:"#00A000"}}>{userMe?.name}</span> welcome to User management table</h3>
                <div>
                    <Button onClick={()=>logout()} danger className="d-flex align-items-center"><LogoutOutlined /></Button>
                </div>
            </div>
            <div className="p-5" >
                <div className="p-3" style={{boxShadow:"0 0 10px #999", borderRadius:'8px'}}>
                    <div className="mt-2 mb-3 d-flex justify-content-end">
                        <Button disabled={selectedRows < 1} loading={actionLoading} onClick={()=>changeStatus("blocked")} size={"large"} type="primary" danger icon={<LockOutlined />} className="d-flex align-items-center">Block</Button>
                        <Button disabled={selectedRows < 1} loading={actionLoading} onClick={()=>changeStatus("active")} size={"large"} type="primary" className="mx-3 d-flex align-items-center"><UnlockOutlined /> Unblock</Button>
                        <Button disabled={selectedRows < 1} loading={actionLoading} onClick={()=>deleteUser()} size={"large"} danger className="d-flex align-items-center"><DeleteOutlined /></Button>
                    </div>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                            selectedRowKeys: selectedRows.map(item=>item.key)
                        }}
                        columns={columns}
                        dataSource={users}
                    />
                </div>
            </div>
        </div>
    );
}

export default Users;
