import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { request } from '@umijs/max';
import CreateExperience from './create-experience';
import UpdateExperience from './update-experience';
import DeleteExperience from './delete-experience';

const ListExperiences = ( { experiencesTableRef, tutorID } ) => {

	const [ createModelVisiblity, setCreateModelVisiblity ] = useState( false );
    const [ editModelVisiblity, setEditModelVisiblity ] = useState( false );
	const [ editModelData, setEditModelData ] = useState( {} );

	const experienceColumns = [

        {
            title: 'ID',
            dataIndex: 'id',
            key: 'table-column-id',
            hideInSearch: true,
            sorter: true,
            defaultSortOrder: 'descend',
        },
        {
            title: "Job Title",
            dataIndex: 'title',
            key: 'table-column-job-title',
            hideInSearch: true,
        },
        {
            title: "Institution/Organization",
            dataIndex: 'organization',
            key: 'table-column-institution-organization',
            hideInSearch: true,
        },
        {
            title: "Start Date",
            dataIndex: 'start_date',
            key: 'table-column-start-date',
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "End Date",
            dataIndex: 'end_date',
            key: 'table-column-end-date',
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

                <DeleteExperience
                    rowId={ record?.id }
                    onFinish={ ( { status, text_message } ) => {
                        if ( status ) {
                            message.success( text_message );
                            experiencesTableRef.current?.reload();
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
                title="Experience Details"
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
                    actionRef={experiencesTableRef}
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
                                setCreateModelVisiblity(true);
                            }}
                        >
                            <PlusOutlined/> New
                        </Button>,
                    ]}
                    request={
                        async (params = {}, sort, filter, paginate) => {
                            
                            const response = await request('/api/experiences', {
                                
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
                    columns={experienceColumns}
                />
            </ProCard>

            <CreateExperience
                visible={ createModelVisiblity }
                onVisiblityChange={ ( { VisiblityStatus } ) => {
                    setCreateModelVisiblity( VisiblityStatus );
                } }
                onFinish={ ( { status, text_message } ) => {
                    if ( status ) {
                        message.success( text_message );
                        experiencesTableRef.current?.reload();
                    } else {
                        message.error( text_message );
                    }
                } }
                tutorID={ tutorID }
            />
            
            <UpdateExperience
				visible={ editModelVisiblity }
				onVisiblityChange={ ( { VisiblityStatus } ) => {
					setEditModelVisiblity( VisiblityStatus );
				} }
				editModelData={ editModelData }
				onFinish={ ( { status, text_message } ) => {
					if ( status ) {
						message.success( text_message );
						experiencesTableRef.current?.reload();
					} else {
						message.error( text_message );
					}
				} }
			/>
        </>
	);
};
export default ListExperiences;
