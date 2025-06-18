import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { request } from '@umijs/max';
import moment from 'moment';
import CreateQuestion from './create-question';
import UpdateQuestion from './update-question';
import DeleteQuestion from './delete-question';

const ListQuestions = ( { questionsTableRef, quizID, authorID } ) => {

	const [ createModelVisiblity, setCreateModelVisiblity ] = useState( false );
    const [ editModelVisiblity, setEditModelVisiblity ] = useState( false );
	const [ editModelData, setEditModelData ] = useState( {} );

	const questionColumns = [

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
                            setEditModelData(record);
                            setEditModelVisiblity(true);
                        }}
                    >
                        <EditOutlined />
                    </Button>,

                    <DeleteQuestion
                        rowId={ record?.id }
                        onFinish={ ( { status, text_message } ) => {
                            if ( status ) {
                                message.success( text_message );
                                questionsTableRef.current?.reload();
                            } else {
                                message.error( text_message );
                            }
                        } }
                    />,
                </>
            ],
        },
    ];

	return (
        <>
            <ProCard
                title="Question Details"
                bordered
                headerBordered
                collapsible
                size="default"
                type="inner"
                style={{
                    marginBlockEnd: 15,
                    minWidth: 800,
                    maxWidth: '100%',
                }}
            >
            
                <ProTable
                    actionRef={questionsTableRef}
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
                                setCreateModelVisiblity(true);
                            }}
                        >
                            <PlusOutlined/> New
                        </Button>,
                    ]}
                    request={
                        async (params = {}, sort, filter, paginate) => {

                            const response = await request('/api/questions', {
                                
                                params: {
                                    // quiz_id: quizID,
                                    page: params?.current,
                                    per_page: params?.pageSize,
                                    order_by: 'id',
                                    order: 'desc',
                                }
                        
                            }).catch(function (error) {
                                console.log(error);
                            })
                            return { data: response.data.data, total: response.data.total, current_page: response.data.current_page};
                        }}
                    columns={questionColumns}
                />
            
            </ProCard>
            <CreateQuestion
                visible={ createModelVisiblity }
                onVisiblityChange={ ( { VisiblityStatus } ) => {
                    setCreateModelVisiblity( VisiblityStatus );
                } }
                onFinish={ ( { status, text_message } ) => {
                    if ( status ) {
                        message.success( text_message );
                        questionsTableRef.current?.reload();
                    } else {
                        message.error( text_message );
                    }
                } }
                quizID={ quizID }
                authorID= { authorID }
            />
            <UpdateQuestion
				visible={ editModelVisiblity }
				onVisiblityChange={ ( { VisiblityStatus } ) => {
					setEditModelVisiblity( VisiblityStatus );
				} }
				editModelData={ editModelData }
				onFinish={ ( { status, text_message } ) => {
					if ( status ) {
						message.success( text_message );
						questionsTableRef.current?.reload();
					} else {
						message.error( text_message );
					}
				} }
			/>
        </>
	);
};
export default ListQuestions;
