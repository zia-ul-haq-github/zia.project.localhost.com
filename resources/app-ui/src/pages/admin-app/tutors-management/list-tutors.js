import {DeleteOutlined, DownloadOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined} from '@ant-design/icons';
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

const ListTutors = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const usersTableRef = useRef();

    const [tutorDeleteConfirmationData, setTutorDeleteConfirmationData] = useState({});
    const [tutorDeleteConfirmationModelOpen, setTutorDeleteConfirmationModelOpen] = useState(false);


//   const deleteTutor = async (userId) => {
//     console.log('deleteTutor');

//     request('/api/users/' + userId, {

//         method: 'DELETE',

//     }).then(async (api_response) => {
//         console.log('api_response');
//         console.log(api_response);

//         if (api_response.status === true) {

//             // await waitTime(3000);

//             console.log('api_response.status');

//             await message.success('Deleted successfully');

//             if (usersTableRef.current) {
//                 usersTableRef.current?.reloadAndRest?.();
//             }
//         }

//     }).catch(function (error) {
//         console.log(error);
//     });

//     return true;
//   };


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
            dataIndex: 'qualifications',
            key: 'table-column-qualification',
            hideInSearch: true,
            render: (text, record, _, action) => [

                record?.qualifications?.length > 0 ? record.qualifications.map((q) => q.degree).join(", ") : "No qualifications available"

            ],
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
                        history.push('/admin-app/tutors/edit/' + record.id);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        setTutorDeleteConfirmationData(record);

                        setTutorDeleteConfirmationModelOpen(true);

                    }}
                    danger={true}
                >
                    <DeleteOutlined />
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
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-02-20T12:30:00Z",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            qualification: "PhD in Mathematics",
            created_at: "2023-12-10T09:30:00Z",
            updated_at: "2024-02-18T15:45:00Z",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 3,
            name: "Alice Johnson",
            email: "alicejohnson@example.com",
            qualification: "BSc in Physics",
            created_at: "2024-02-01T08:20:00Z",
            updated_at: "2024-02-25T11:10:00Z",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 4,
            name: "Robert Brown",
            email: "robertbrown@example.com",
            qualification: "MEd in English Literature",
            created_at: "2023-11-05T14:45:00Z",
            updated_at: "2024-01-30T09:50:00Z",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        },
        {
            id: 5,
            name: "Emily Davis",
            email: "emilydavis@example.com",
            qualification: "MA in History",
            created_at: "2024-01-22T13:15:00Z",
            updated_at: "2024-02-15T14:20:00Z",
            image_url: "https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg",
        }
    ];    

      
    //   const tutorDummyListDataSource: TableListItem[] = [];

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
                    onChange: (page) => console.log(page),
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="new"
                        onClick={() => {
                            history.push('/admin-app/tutors/new');
                        }}
                    >
                        <PlusOutlined/> New
                    </Button>,
                ]}
                // dataSource={TableListItem}
                // params={{

                // }}
                request={

                    // async (params = {}, sort, filter, paginate) => {
                        async (params, sort, filter) => {    

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

                        return await request('/api/users', {

                            params: {
                                sort: {...sort},
                                pagination: {...params},
                                role: 'tutor',
                            },

                        }).then(async (api_response) => {
                            console.log('api_response');
                            console.log(api_response);

                            console.log('api_response.data');
                            console.log(api_response.data);

                            console.log('api_response.data.data');
                            console.log(api_response.data.data);

                            return { data: api_response.data.data, total: api_response.data.total, current_page: api_response.data.current_page};

                        }).catch(function (error) {
                            console.log(error);
                        });

                    }}
                columns={columns}
            />


          <ModalForm
            open={tutorDeleteConfirmationModelOpen}
            onOpenChange={setTutorDeleteConfirmationModelOpen}
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
              afterClose: () => {
                /**
                 * Reset the Policy Selected Users when the modal is close to make sure the modal new open will be fresh
                 */
                // setTargetKeys([]);
              },
              getContainer: () => {
                document.body
              },
              width: 716,
              okText: 'Confirm',
            }}
            submitter={{
              // Configure the properties of the button
              resetButtonProps: {
                style: {
                  // Hide the reset button
                  // display: 'none',
                },
              },
              submitButtonProps: {
                style: {
                  // Hide the submit button
                  // display: 'none',
                },
              },
            }}
            preserve={false}
            submitTimeout={2000}
            onFinish={async (values) => {
              await waitTime(2000);

              /**
               * Call the APIs to update the selected policy's users association
               */

                request('/api/users/' + tutorDeleteConfirmationData?.id, {
              
                     method: 'DELETE',
                
                }).then(async (api_response) => {
                    console.log('api_response');
                    console.log(api_response);
            
                    if (api_response.status === true) {
            
                        // await waitTime(3000);
            
                        console.log('api_response.status');
            
                        await message.success('Deleted successfully');
            
                        if (usersTableRef.current) {
                            usersTableRef.current?.reloadAndRest?.();
                        }
                    }
            
                }).catch(function (error) {
                    console.log(error);
                });

              /**
               * The following return is necessary to auto close the modal
               */
              return true;
            }}
          >

            <h6 style={{fontSize: '16px'}}>
              <span> <ExclamationCircleFilled style={{color: '#ff4d4f', fontSize: '20px', paddingRight: '5px'}} /> </span>
              Are you sure you want to delete this tutor?
            </h6>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Name: </strong> {tutorDeleteConfirmationData?.name}
            </span>

            <Divider style={{margin: '10px 0px'}}/>

            <p style={{fontSize: '16px', paddingLeft: '30px'}}>
              Please confirm if you would like to proceed with deleting this tutor.
            </p>

            <span style={{fontSize: '16px', paddingLeft: '30px', color: 'red'}} >
                Note: This action cannot be undone.
            </span>

          </ModalForm>


        </PageContainer>
    );
};

export default ListTutors;
