import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { request } from '@umijs/max';
import CreateQualification from './create-qualification';
import UpdateQualification from './update-qualification';
import DeleteQualification from './delete-qualification';

const ListQualifications = ( { qualificationsTableRef, tutorID } ) => {

	const [ createModelVisiblity, setCreateModelVisiblity ] = useState( false );
    const [ editModelVisiblity, setEditModelVisiblity ] = useState( false );
	const [ editModelData, setEditModelData ] = useState( {} );

	const qualificationColumns = [

        {
            title: 'ID',
            dataIndex: 'id',
            key: 'table-column-id',
            hideInSearch: true,
            sorter: true,
            defaultSortOrder: 'descend',
        },
        {
            title: "University/Institution",
            dataIndex: 'institute',
            key: 'table-column-university-institution',
            hideInSearch: true,
        },
        {
            title: "Degree",
            dataIndex: 'degree',
            key: 'table-column-degree',
            hideInSearch: true,
        },
        {
            title: "Board",
            dataIndex: 'board',
            key: 'table-column-board',
            hideInSearch: true,
        },
        {
            title: "Grade",
            dataIndex: 'grade',
            key: 'table-column-grade',
            hideInSearch: true,
        },
        {
            title: "Year of Completion",
            dataIndex: 'completion_date',
            key: 'table-column-year-of-completion',
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: 'Actions',
            valueType: 'option',
            key: 'table-column-actions',
            render: (text, record, _, action) => [

                <Button
                    key="editable"
                    onClick={() => {
                        setEditModelData(record);
                        setEditModelVisiblity(true);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <DeleteQualification
                    rowId={ record?.id }
                    onFinish={ ( { status, text_message } ) => {
                        if ( status ) {
                            message.success( text_message );
                            qualificationsTableRef.current?.reload();
                        } else {
                            message.error( text_message );
                        }
                    } }
                />,

            ],
        },
    ];

	return (
        <>
            <ProCard
                title="Qualification Details"
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
                    actionRef={qualificationsTableRef}
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

                            const response = await request('/api/qualifications', {
                                
                                params: {
                                    user_id: tutorID,
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
                    columns={qualificationColumns}
                />
            
            </ProCard>
            <CreateQualification
                visible={ createModelVisiblity }
                onVisiblityChange={ ( { VisiblityStatus } ) => {
                    setCreateModelVisiblity( VisiblityStatus );
                } }
                onFinish={ ( { status, text_message } ) => {
                    if ( status ) {
                        message.success( text_message );
                        qualificationsTableRef.current?.reload();
                    } else {
                        message.error( text_message );
                    }
                } }
                tutorID={ tutorID }
            />
            <UpdateQualification
				visible={ editModelVisiblity }
				onVisiblityChange={ ( { VisiblityStatus } ) => {
					setEditModelVisiblity( VisiblityStatus );
				} }
				editModelData={ editModelData }
				onFinish={ ( { status, text_message } ) => {
					if ( status ) {
						message.success( text_message );
						qualificationsTableRef.current?.reload();
					} else {
						message.error( text_message );
					}
				} }
			/>
        </>
	);
};
export default ListQualifications;
