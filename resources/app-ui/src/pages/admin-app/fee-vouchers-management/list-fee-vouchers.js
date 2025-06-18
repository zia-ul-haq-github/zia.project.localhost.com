import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { request, history } from '@umijs/max';
import moment from 'moment';
import { useModel } from 'umi';
import { useEffect, useRef, useState } from "react";
import DeleteFeeVoucher from './delete-fee-voucher';

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

const ListFeeVouchers = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const feevouchersTableRef = useRef();

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
			title: 'Status',
			dataIndex: 'status',
			key: 'table-column-status',
			hideInSearch: true,
			render: ( text ) => (
				<Tag color={ text === 'paid' ? 'green' : 'red' }>
					{ text === 'paid' ? 'Paid' : 'Unpaid' }
				</Tag>
			),
		},
        {
            title: 'Verification Status',
            dataIndex: 'verification_status',
            key: 'table-column-verification-status',
            hideInSearch: true,
            render: ( text ) => (
                <Tag color={ text === 'verified' ? 'green' : 'red' }>
                    { text === 'verified' ? 'Verified' : 'Pending' }
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
                <>
                    <Button
                        key="editable"
                        onClick={() => {
                            history.push('/admin-app/fee-vouchers/edit/' + record.id);
                        }}
                    >
                        <EditOutlined />
                    </Button>,

                    <DeleteFeeVoucher
                        rowId={ record?.id }
                        onFinish={ ( { status, text_message } ) => {
                            if ( status ) {
                                message.success( text_message );
                                feevouchersTableRef.current?.reload();
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
                actionRef={feevouchersTableRef}
                rowKey="id"
                search={false}
                options={false}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
                request={

                        async (params, sort, filter) => {

                        /**
                         * Delay the API request
                         */
                        await waitTime(2000);

                        return await request('/api/fee-vouchers', {

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

export default ListFeeVouchers;
