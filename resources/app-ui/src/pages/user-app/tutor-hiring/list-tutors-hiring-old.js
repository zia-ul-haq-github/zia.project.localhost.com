import {DeleteOutlined, DownloadOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined, EyeOutlined} from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProTable
} from '@ant-design/pro-components';
import {Button, Avatar, message, Col, Row, Divider} from 'antd';
import {request,history, FormattedMessage} from '@umijs/max';
import moment from 'moment';
import {useModel} from 'umi';
import {useRef, useState} from "react";


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

const ListTutorsHiring = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const listTutorsHiringTableRef = useRef();

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
            title: "Qualification",
            dataIndex: 'qualification',
            key: 'table-column-qualification',
            hideInSearch: true,
        },
        {
            title: "University/Institution",
            dataIndex: 'university_institution',
            key: 'table-column-university-institution',
            hideInSearch: true,
        },
        {
            title: 'Actions',
            valueType: 'option',
            key: 'table-column-actions',
            render: (text, record, _, action) => [

                <Button
                    key="viewable"
                    onClick={() => {
                        // history.push('/user-app/tutors/edit/' + record.id);
                    }}
                >
                    <EyeOutlined />
                </Button>,

            ],
        },
    ];

    const TableListItem = [
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            qualification: "MSc in Computer Science",
            university_institution: "Harvard University",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            qualification: "PhD in Mathematics",
            university_institution: "Stanford University",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 3,
            name: "Alice Johnson",
            email: "alicejohnson@example.com",
            qualification: "BSc in Physics",
            university_institution: "Massachusetts Institute of Technology (MIT)",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 4,
            name: "Robert Brown",
            email: "robertbrown@example.com",
            qualification: "MEd in English Literature",
            university_institution: "University of Oxford",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 5,
            name: "Emily Davis",
            email: "emilydavis@example.com",
            qualification: "MA in History",
            university_institution: "University of Cambridge",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        }
    ];    

      
    //   const tutorDummyListDataSource: TableListItem[] = [];

    return (
        <PageContainer>
            <ProTable
                actionRef={listTutorsHiringTableRef}
                rowKey="id"
                search={false}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    onChange: (page) => console.log(page),
                }}
                dataSource={TableListItem}
                request={

                    async (params = {}, sort, filter, paginate) => {

                        console.log('params');
                        console.log(params);

                        console.log('params - sort');
                        console.log(sort);

                        console.log('params - filter');
                        console.log(filter);

                        /**
                         * Delay the API request
                         */
                        await waitTime(2000);

                        // return await request('/api/users', {

                        //     params: {
                        //         page: params?.current,
                        //         per_page: params?.pageSize,
                        //         order_by: 'id',
                        //         order: 'desc',
                        //     },

                        // }).then(async (api_response) => {
                        //     console.log('api_response');
                        //     console.log(api_response);

                        //     console.log('api_response.data');
                        //     console.log(api_response.data);

                        //     console.log('api_response.data.data');
                        //     console.log(api_response.data.data);

                        //     return { data: api_response.data.data, total: api_response.data.total, current_page: api_response.data.current_page};

                        // }).catch(function (error) {
                        //     console.log(error);
                        // });

                    }}
                columns={columns}
            />

        </PageContainer>
    );
};

export default ListTutorsHiring;
