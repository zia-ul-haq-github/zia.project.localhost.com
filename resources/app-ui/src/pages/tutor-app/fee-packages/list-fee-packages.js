import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { request, history } from '@umijs/max';
import moment from 'moment';
import { useModel } from 'umi';
import { useEffect, useRef, useState } from "react";
import DeleteFeePackage from './delete-fee-package';

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

const ListFeePackages = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const feepackagesTableRef = useRef();

    const [authorId, setAuthorId] = useState(0);

    useEffect(() => {
        setAuthorId(initialState?.currentUser?.id);
    }, []); //empty dependency array so it only runs once at render

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
            title: "Fee Amount",
            dataIndex: 'fee_amount',
            key: 'table-column-fee-amount',
            hideInSearch: true,
        },
        {
            title: "Service Charges",
            dataIndex: 'service_charges_amount',
            key: 'table-column-service-charges-amount',
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
                <>
                    <Button
                        key="editable"
                        onClick={() => {
                            history.push('/tutor-app/fee-packages/edit/' + record.id);
                        }}
                    >
                        <EditOutlined />
                    </Button>,

                    <DeleteFeePackage
                        rowId={ record?.id }
                        onFinish={ ( { status, text_message } ) => {
                            if ( status ) {
                                message.success( text_message );
                                feepackagesTableRef.current?.reload();
                            } else {
                                message.error( text_message );
                            }
                        } }
                    />
                </>
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable
                actionRef={feepackagesTableRef}
                rowKey="id"
                search={false}
                options={false}
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
                            history.push('/tutor-app/fee-packages/new');
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

                        return await request('/api/fee-packages', {

                            params: {
                                // author_id: authorId,
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

export default ListFeePackages;
