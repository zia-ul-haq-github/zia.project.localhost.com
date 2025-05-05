import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Avatar, message } from 'antd';
import { request, history } from '@umijs/max';
import moment from 'moment';
import { useModel } from 'umi';
import { useRef } from "react";

import DeleteUser from './delete-user';

export const waitTimePromise = async (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time = 100) => {
    await waitTimePromise(time);
};

const ListUsers = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const usersTableRef = useRef();

    const columns = [

        {
            title: 'ID',
            dataIndex: 'id',
            key: 'table-column-id',
            hideInSearch: true,
            sorter: true,
            defaultSortOrder: 'descend',
        },
        {
            title: "Name",
            key: 'table-column-name',
            copyable: true,
            hideInSearch: true,
            render: (dom, record) => {

                return (
                    <div>

                        <Avatar size={"large"}
                        src={(null !== record?.image_url ? record?.image_url : DEFAULT_USER_PROFILE_IMAGE_URL)}/>
                        <span style={{margin: "0px 0px 0px 10px"}}>

                            {record?.name}

                        </span>

                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: 'email',
            key: 'table-column-email',
            hideInSearch: true,
        },
        {
            title: "Created Date",
            dataIndex: 'created_at',
            key: 'table-column-created-date',
            sorter: true,
            hideInForm: true,
            hideInSearch: true,
            render: (created_at) => {
              return (<p>{moment( new Date(created_at) ).format('DD-MM-YYYY')}</p>)
            },
        },
        {
            title: "Updated Date",
            dataIndex: 'updated_at',
            key: 'table-column-updated-date',
            sorter: true,
            hideInForm: true,
            hideInSearch: true,
            render: (updated_at) => {
              return (<p>{moment( new Date(updated_at) ).format('DD-MM-YYYY')}</p>)
            },
        },
        {
            title: 'Actions',
            valueType: 'option',
            key: 'table-column-actions',
            render: (text, record, _, action) => [

                <Button
                    key="editable"
                    onClick={() => {
                        history.push('/admin-app/users/edit/' + record.id);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <DeleteUser
                    rowId={ record?.id }
                    onFinish={ ( { status, text_message } ) => {
                        if ( status ) {
                            message.success( text_message );
                            usersTableRef.current?.reload();
                        } else {
                            message.error( text_message );
                        }
                    } }
                />,

            ],
        },
    ];
  
    return (
        <PageContainer>
            <ProTable
                actionRef={usersTableRef}
                rowKey="id"
                search={false}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="new"
                        onClick={() => {
                            history.push('/admin-app/users/new');
                        }}
                    >
                        <PlusOutlined/> New
                    </Button>,
                ]}
                request={

                        async (params, sort, filter) => {

                        /**
                         * Delay the API request
                         */
                        await waitTime(2000);

                        return await request('/api/users', {

                            params: {
                                sort: {...sort},
                                pagination: {...params},
                                role: 'user',
                            },

                        }).then(async (api_response) => {

                            return { data: api_response.data.data, total: api_response.data.total, current_page: api_response.data.current_page};

                        }).catch(function (error) {
                            console.log(error);
                        });

                    }}
                columns={columns}
            />

        </PageContainer>
    );
};

export default ListUsers;
