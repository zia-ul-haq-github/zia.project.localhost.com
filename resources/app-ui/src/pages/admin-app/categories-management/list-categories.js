import {DeleteOutlined, DownloadOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined} from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProTable
} from '@ant-design/pro-components';
import {Button, Avatar, message, Col, Row, Divider, Image} from 'antd';
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

const ListCategories = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const categoriesTableRef = useRef();

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

//             if (categoriesTableRef.current) {
//                 categoriesTableRef.current?.reloadAndRest?.();
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
            title: "Title",
            key: 'table-column-title',
            copyable: true,
            hideInSearch: true,
            render: (dom, record) => {

                return (
                    <div>

                        <Image
                    width={50}
                    height={50}
                    src={record?.image_url}
                  />
                  <span style={{margin: "0px 0px 0px 10px"}}>
                    {record?.title}
                  </span>

                    </div>
                );
            },
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
                        history.push('/admin-app/categories/edit/' + record.id);
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
            title: "Mathematics",
            description: "Tutors for Algebra, Geometry, Calculus, and more.",
            image_url: "https://via.placeholder.com/150?text=Mathematics",
            author_id: 1,
            created_at: "2025-04-01T09:00:00Z",
            updated_at: "2025-04-01T09:00:00Z"
        },
        {
            id: 2,
            title: "Science",
            description: "Physics, Chemistry, and Biology tutoring sessions.",
            image_url: "https://via.placeholder.com/150?text=Science",
            author_id: 2,
            created_at: "2025-04-01T10:30:00Z",
            updated_at: "2025-04-01T10:30:00Z"
        },
        {
            id: 3,
            title: "English Language",
            description: "Improve grammar, vocabulary, and writing skills.",
            image_url: "https://via.placeholder.com/150?text=English",
            author_id: 3,
            created_at: "2025-04-01T11:45:00Z",
            updated_at: "2025-04-01T11:45:00Z"
        },
        {
            id: 4,
            title: "Programming",
            description: "Coding help in Python, JavaScript, C++, and more.",
            image_url: "https://via.placeholder.com/150?text=Programming",
            author_id: 4,
            created_at: "2025-04-01T13:15:00Z",
            updated_at: "2025-04-01T13:15:00Z"
        },
        {
            id: 5,
            title: "Test Preparation",
            description: "Tutoring for SAT, GRE, IELTS, TOEFL, and more.",
            image_url: "https://via.placeholder.com/150?text=Test+Prep",
            author_id: 5,
            created_at: "2025-04-01T14:20:00Z",
            updated_at: "2025-04-01T14:20:00Z"
        },
        {
            id: 6,
            title: "Business & Finance",
            description: "Accounting, economics, and business studies help.",
            image_url: "https://via.placeholder.com/150?text=Business",
            author_id: 6,
            created_at: "2025-04-01T15:00:00Z",
            updated_at: "2025-04-01T15:00:00Z"
        },
        {
            id: 7,
            title: "Art & Design",
            description: "Drawing, painting, and design theory tutoring.",
            image_url: "https://via.placeholder.com/150?text=Art+Design",
            author_id: 7,
            created_at: "2025-04-01T16:10:00Z",
            updated_at: "2025-04-01T16:10:00Z"
        },
        {
            id: 8,
            title: "Languages",
            description: "Learn Spanish, French, German, Mandarin and more.",
            image_url: "https://via.placeholder.com/150?text=Languages",
            author_id: 8,
            created_at: "2025-04-01T17:05:00Z",
            updated_at: "2025-04-01T17:05:00Z"
        }
    ];    

      
    //   const tutorDummyListDataSource: TableListItem[] = [];

    return (
        <PageContainer>
            <ProTable
                actionRef={categoriesTableRef}
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
                            history.push('/admin-app/categories/new');
                        }}
                    >
                        <PlusOutlined/> New
                    </Button>,
                ]}
                dataSource={TableListItem}
                // params={{

                // }}
                // request={

                //     // async (params = {}, sort, filter, paginate) => {
                //         async (params, sort, filter) => {    

                //         console.log('params');
                //         console.log(params);

                //         console.log('params - sort');
                //         console.log(sort);

                //         console.log('params - filter');
                //         console.log(filter);

                //         /**
                //          * Delay the API request
                //          */
                //         await waitTime(2000);

                //         return await request('/api/users', {

                //             params: {
                //                 sort: {...sort},
                //                 pagination: {...params},
                //                 role: 'tutor',
                //             },

                //         }).then(async (api_response) => {
                //             console.log('api_response');
                //             console.log(api_response);

                //             console.log('api_response.data');
                //             console.log(api_response.data);

                //             console.log('api_response.data.data');
                //             console.log(api_response.data.data);

                //             return { data: api_response.data.data, total: api_response.data.total, current_page: api_response.data.current_page};

                //         }).catch(function (error) {
                //             console.log(error);
                //         });

                //     }}
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
            // onFinish={async (values) => {
            //   await waitTime(2000);

            //   /**
            //    * Call the APIs to update the selected policy's users association
            //    */

            //     request('/api/users/' + tutorDeleteConfirmationData?.id, {
              
            //          method: 'DELETE',
                
            //     }).then(async (api_response) => {
            //         console.log('api_response');
            //         console.log(api_response);
            
            //         if (api_response.status === true) {
            
            //             // await waitTime(3000);
            
            //             console.log('api_response.status');
            
            //             await message.success('Deleted successfully');
            
            //             if (categoriesTableRef.current) {
            //                 categoriesTableRef.current?.reloadAndRest?.();
            //             }
            //         }
            
            //     }).catch(function (error) {
            //         console.log(error);
            //     });

            //   /**
            //    * The following return is necessary to auto close the modal
            //    */
            //   return true;
            // }}
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

export default ListCategories;
