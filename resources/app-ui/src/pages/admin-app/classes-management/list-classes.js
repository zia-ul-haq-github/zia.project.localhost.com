import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { request, history } from '@umijs/max';
import moment from 'moment';
import { useModel } from 'umi';
import { useRef } from "react";
import DeleteClass from './delete-class';

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

const ListClasses = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const classesTableRef = useRef();

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
			title: 'Title',
			dataIndex: 'title',
			key: 'table-column-title',
			hideInSearch: true,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'table-column-description',
			hideInSearch: true,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'table-column-status',
			hideInSearch: true,
			render: ( text ) => (
				<Tag color={ text === 'active' ? 'green' : 'red' }>
					{ text === 'active' ? 'Active' : 'In-Active' }
				</Tag>
			),
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
                        history.push('/admin-app/classes/edit/' + record.id);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <DeleteClass
                    rowId={ record?.id }
                    onFinish={ ( { status, text_message } ) => {
                        if ( status ) {
                            message.success( text_message );
                            classesTableRef.current?.reload();
                        } else {
                            message.error( text_message );
                        }
                    } }
                />

            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable
                actionRef={classesTableRef}
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
                            history.push('/admin-app/classes/new');
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

                        return await request('/api/classes', {

                            params: {
                                sort: {...sort},
                                pagination: {...params},
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

export default ListClasses;
