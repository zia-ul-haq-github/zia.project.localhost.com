import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProTable,
    ProFormDatePicker,
    ModalForm
} from '@ant-design/pro-components';
import {Row, Col, message, Button, Form, Image, Upload, Divider} from 'antd';
import {UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from "react";
import {request, history} from '@umijs/max';
import {useModel, useParams} from "@@/exports";

import moment from 'moment';

import { getFile, getBase64 } from '@/components/Helpers/ImageConversion';


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

/**
 * The Form Initial values
 */
const initialValues = {
    image_url: '',
    name: '',
    email: '',
    date_of_birth: '',
    mobile_no: '',
    bio_data: '',
};

/**
 * Form Submission handler and API Request Performer
 */
const onFinishHandlerForm = async (imageUrl, values) => {
    console.log('onFinishHandlerForm');
    console.log('Received values of form: ', values);

    /**
     * API Request
     */
    try {

        const request_data = {
            image_url: imageUrl,
            name: values?.name,
            email: values?.email,
            date_of_birth: values?.date_of_birth,
            mobile_no: values?.mobile_no,
            bio_data: values?.bio_data,
        };

        return await request('/api/users/' + values?.user_id, {
            method: 'PUT',
            data: request_data,

        }).then(async (api_response) => {
            console.log('api_response');
            console.log(api_response);

            /**
             * User Created then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
            }

        }).catch(function (error) {
            console.log(error);
        });

    } catch (api_response) {
        console.log('api_response - error');
        console.log(api_response);
    }

    return true;
};


const UpdateProfile = () => {

    const params = useParams();

    /**
     * States of Component
     */

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
    const [form] = Form.useForm();
    const qualificationsTableRef = useRef();
    const experiencesTableRef = useRef();
    const [userId, setUserId] = useState(0);

    const [userProfileImageUrl, setUserProfileImageUrl] = useState('');
    const [imageUrl, setImageUrl] = useState(userProfileImageUrl);

    const [editTutorCreateQualificationModelOpen, setEditTutorCreateQualificationModelOpen] = useState(false);

    const [editTutorEditQualificationData, setEditTutorEditQualificationData] = useState({});
    const [editTutorEditQualificationModelOpen, setEditTutorEditQualificationModelOpen] = useState(false);

    const [editTutorDeleteQualificationConfirmationData, setEditTutorDeleteQualificationConfirmationData] = useState({});
    const [editTutorDeleteQualificationModelOpen, setEditTutorDeleteQualificationModelOpen] = useState(false);

    const [editTutorCreateExperienceModelOpen, setEditTutorCreateExperienceModelOpen] = useState(false);

    const [editTutorEditExperienceData, setEditTutorEditExperienceData] = useState({});
    const [editTutorEditExperienceModelOpen, setEditTutorEditExperienceModelOpen] = useState(false);

    const [editTutorDeleteExperienceConfirmationData, setEditTutorDeleteExperienceConfirmationData] = useState({});
    const [editTutorDeleteExperienceModelOpen, setEditTutorDeleteExperienceModelOpen] = useState(false);


    useEffect(() => {
        setUserId(initialState?.currentUser?.id);
    }, []); //empty dependency array so it only runs once at render


    // const handleChange = (info) => {
    //     if (info.file.status === 'uploading') {
    //         return;
    //     }
    //     if( info.file.status == "removed" ){
    //         setImageUrl('');
    //     }

    //     if (info.file.status === 'done') {
    //         getBase64(info).then((base64String) => {
    //             console.log('base64String');
    //             console.log(base64String);
    //             setImageUrl(base64String);
    //         });

    //     }

    //     if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }

    // };


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
                        setEditTutorEditQualificationData(record);
                        setEditTutorEditQualificationModelOpen(true);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        setEditTutorDeleteQualificationConfirmationData(record);
                        setEditTutorDeleteQualificationModelOpen(true);

                    }}
                    danger={true}
                >
                    <DeleteOutlined />
                </Button>,

            ],
        },
    ];
    
    
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
                        setEditTutorEditExperienceData(record);
                        setEditTutorEditExperienceModelOpen(true);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        setEditTutorDeleteExperienceConfirmationData(record);
                        setEditTutorDeleteExperienceModelOpen(true);

                    }}
                    danger={true}
                >
                    <DeleteOutlined />
                </Button>,

            ],
        },
    ];



    /**
     * The Component Output
     */

        return (
            <PageContainer>

                <ProForm
                    layout='vertical'
                    grid={true}
                    form={form}
                    initialValues={initialValues}
                    params={ { 'user_id': userId } }
                    request={

                        async (params= {} ) => {

                            console.log('proform-params');
                            console.log(params);

                            if( params?.user_id == 0 ) {
                                return;
                            }

                            await waitTime(2000);

                            return await request('/api/users/' + params?.user_id, {
                                method: 'GET',
                            }).then(async (api_response) => {
                                console.log('api_response');
                                console.log(api_response);

                                setUserProfileImageUrl(api_response?.data?.image_url);

                                return {
                                    ...initialValues,
                                    image_url: api_response?.data?.image_url,
                                    name: api_response?.data?.name,
                                    email: api_response?.data?.email,
                                    date_of_birth: api_response?.data?.date_of_birth,
                                    mobile_no: api_response?.data?.mobile_no,
                                    bio_data: api_response?.data?.bio_data,
                                };

                            }).catch(function (error) {
                                console.log(error);
                            });

                        }
                    }
                    onFinish={async (values) => {
                        console.log(values);

                        await waitTime(1000);

                        values.user_id = userId;
                        values.image_url = imageUrl;

                        await onFinishHandlerForm(imageUrl, values);
                    }}
                    formProps={{
                        validateMessages: {
                            required: 'This is required',
                        },
                    }}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    }}
                >

                    <ProCard
                        title="Account Details"
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
                        onCollapse={(collapse) => console.log(collapse)}
                    >
                        <Row
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                        >
                            <Col span={6}>

                                <ProForm.Group size={24}>
                                    <Col span={24}>
                                        <Image
                                            width='100%'
                                            height={200}
                                            src={imageUrl}
                                            fallback={('' !== userProfileImageUrl ? userProfileImageUrl : DEFAULT_USER_PROFILE_IMAGE_URL)}
                                        />
                                    </Col>

                                    <Col span={24} style={{ textAlign: 'center'}}>
                                        <ProForm.Item name='image_url' getValueFromEvent={getFile}>
                                            <Upload
                                                name={'file'}
                                                onChange={(info) => {
                                                
                                                    console.log('file - onChange - info');
                                                    console.log(info);

                                                    if (info.file.status === 'uploading') {
                                                        return;
                                                    }
                                                    if( info.file.status == "removed" ){
                                                        setImageUrl('');
                                                    }
                                            
                                                    if (info.file.status === 'done') {


                                                        setImageUrl(info?.file?.response?.url); 

                                                        // getBase64(info).then((base64String) => {
                                                        //     console.log('base64String');
                                                        //     console.log(base64String);
                                                        //     setImageUrl(base64String);
                                                        // });
                                            
                                                    }
                                            
                                                    if (info.file.status === 'error') {
                                                        message.error(`${info.file.name} file upload failed.`);
                                                    }
                                            
                                                }}
                                                maxCount={1}
                                                action="/api/file-manager/upload"
                                                data={{
                                                    'directory': 'users'
                                                }}
                                                onRemove={(file) => {
                                                    console.log('file is removed');
                                                    console.log(file);

                                                    request('/api/file-manager/delete', {
                                                        method: 'DELETE',
                                                        data: {
                                                           'filename': file?.name,
                                                            'directory': 'users' 
                                                        },
                                                    }).then(async (api_response) => {
                                                        console.log('api_response');
                                                        console.log(api_response);
                                                    });

                                                }}
                                            >
                                                <Button
                                                    type="primary"
                                                    icon={<UploadOutlined/>}
                                                    style={{'margin': '10px 0px 0px 0px'}}
                                                    onClick={(event) => {}}
                                                >
                                                    Change Image
                                                </Button>
                                            </Upload>
                                        </ProForm.Item>

                                    </Col>

                                </ProForm.Group>
                            </Col>
                            <Col span={18}>
                                <ProForm.Group size={24}>
                                    <ProFormText
                                        name={'name'}
                                        label="Name"
                                        placeholder="Type Your Name"
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                    <ProFormText
                                        label="Email"
                                        name={'email'}
                                        placeholder="info@example.com etc."
                                        rules={[{ required: true }]}
                                        disabled={true}
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                </ProForm.Group>
                                <ProForm.Group size={24}>
                                    <ProFormDatePicker
                                        label="Date of Birth"
                                        name={'date_of_birth'}
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                    <ProFormText
                                        name={'mobile_no'}
                                        label="Mobile No"
                                        placeholder="Type Your Mobile No"
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                </ProForm.Group>
                                <ProForm.Group size={24}>
                                    <ProFormTextArea
                                        name={'bio_data'}
                                        label="Biographical Info"
                                        placeholder="Share a little biographical information to fill out your profile. This may be shown publicly. "
                                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                    />
                                </ProForm.Group>
                            </Col>
                        </Row>
                    </ProCard>

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
                                        setEditTutorCreateQualificationModelOpen(true);
                                    }}
                                >
                                    <PlusOutlined/> New
                                </Button>,
                            ]}
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
                                    await waitTime(2000)
                                    const response = await request('/api/qualifications', {
                                        
                                        params: {
                                            user_id: userId,
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
                            // dataSource={editTutorData?.qualifications?.length ? editTutorData.qualifications : []}
                            columns={qualificationColumns}
                        />
                        
                    </ProCard>

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
                                onChange: (page) => console.log(page),
                            }}
                            toolBarRender={() => [
                                <Button
                                    type="primary"
                                    key="new"
                                    onClick={() => {
                                        setEditTutorCreateExperienceModelOpen(true);
                                    }}
                                >
                                    <PlusOutlined/> New
                                </Button>,
                            ]}
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
                                    await waitTime(2000)
                                    const response = await request('/api/experiences', {
                                        
                                        params: {
                                            user_id: userId,
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
                            // dataSource={editTutorData?.experiences?.length ? editTutorData.experiences : []}
                            columns={experienceColumns}
                        />

                    </ProCard>

                </ProForm>

                <ModalForm
                open={editTutorCreateQualificationModelOpen}
                onOpenChange={setEditTutorCreateQualificationModelOpen}
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
                width: 1200,
                okText: 'Create',
                }}
                submitter={{
                    // Configure the properties of the button
                    resetButtonProps: {
                        style: {
                        // Hide the reset button
                        //   display: 'none',
                        },
                    },
                    submitButtonProps: {
                        style: {
                        // Hide the submit button
                        //   display: 'none',
                        },
                    },
                }}
                grid={true}
                preserve={false}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await waitTime(2000);
                    /**
                     * Call the APIs to update the selected policy's users association
                     */
                    const qualification_data = {
                        user_id: userId,
                        institute: values?.institute,
                        degree: values?.degree,
                        board: values?.board,
                        grade: values?.grade,
                        completion_date: moment(new Date(values?.year_of_completion)).format('YYYY'),
                    };
                
                    console.log('qualification_data');
                    console.log(qualification_data);
                
                    /**
                     * API Request
                    */
                
                    request('/api/qualifications', {
                        method: 'POST',
                        data: qualification_data,
                
                    }).then(async (api_response) => {
                        console.log('api_response');
                        console.log(api_response);
                
                        /**
                         * Qualification Created then show message and redirect to listing screen
                         */
                        if (api_response?.data?.id > 0) {
                            await waitTime(3000);
                            
                            message.success('Submitted successfully');

                            if (qualificationsTableRef.current) {
                                qualificationsTableRef.current?.reloadAndRest?.();
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
                <ProCard
                    title="Create Qualification"
                    bordered
                    headerBordered
                    size="default"
                    type="inner"
                    style={{
                        marginBlockEnd: 15,
                        minWidth: 800,
                        maxWidth: '100%',
                    }}
                >
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'institute'}
                            label="University/Institution"
                            placeholder="Type Your University/Institution Name"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'degree'}
                            label="Degree"
                            placeholder="Type Your Degree"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'board'}
                            label="Board"
                            placeholder="Type Your Board Name"
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                        <ProFormText
                            name={'grade'}
                            label="Grade"
                            placeholder="Type Your Grade"
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                        <ProFormDatePicker
                            label="Year of Completion"
                            name={'year_of_completion'}
                            placeholder="Select Year"
                            fieldProps={{
                                picker: 'year',
                                format: 'YYYY'
                            }}
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                    </ProForm.Group>
                </ProCard>
            </ModalForm>

            <ModalForm
                open={editTutorEditQualificationModelOpen}
                onOpenChange={setEditTutorEditQualificationModelOpen}
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
                width: 1200,
                okText: 'Update',
                }}
                submitter={{
                    // Configure the properties of the button
                    resetButtonProps: {
                        style: {
                        // Hide the reset button
                        //   display: 'none',
                        },
                    },
                    submitButtonProps: {
                        style: {
                        // Hide the submit button
                        //   display: 'none',
                        },
                    },
                }}
                grid={true}
                preserve={false}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await waitTime(2000);
                    /**
                     * Call the APIs to update the selected policy's users association
                     */
                    const qualification_data = {
                        // user_id: tutorID,
                        institute: values?.institute,
                        degree: values?.degree,
                        board: values?.board,
                        grade: values?.grade,
                        completion_date: moment(new Date(values?.year_of_completion)).format('YYYY'),
                    };
                
                    console.log('qualification_data');
                    console.log(qualification_data);
                
                    /**
                     * API Request
                    */
                
                    request('/api/qualifications/' + editTutorEditQualificationData?.id, {
                        method: 'PUT',
                        data: qualification_data,
                
                    }).then(async (api_response) => {
                        console.log('api_response');
                        console.log(api_response);
                
                        /**
                         * Qualification Created then show message and redirect to listing screen
                         */
                        if (api_response?.data?.id > 0) {
                            await waitTime(3000);
                            
                            message.success('Submitted successfully');

                            if (qualificationsTableRef.current) {
                                qualificationsTableRef.current?.reloadAndRest?.();
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
                <ProCard
                    title="Edit Qualification"
                    bordered
                    headerBordered
                    size="default"
                    type="inner"
                    style={{
                        marginBlockEnd: 15,
                        minWidth: 800,
                        maxWidth: '100%',
                    }}
                >
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'institute'}
                            label="University/Institution"
                            initialValue={editTutorEditQualificationData?.institute}
                            placeholder="Type Your University/Institution Name"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'degree'}
                            label="Degree"
                            initialValue={editTutorEditQualificationData?.degree}
                            placeholder="Type Your Degree"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'board'}
                            label="Board"
                            initialValue={editTutorEditQualificationData?.board}
                            placeholder="Type Your Board Name"
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                        <ProFormText
                            name={'grade'}
                            label="Grade"
                            initialValue={editTutorEditQualificationData?.grade}
                            placeholder="Type Your Grade"
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                        <ProFormDatePicker
                            label="Year of Completion"
                            name={'year_of_completion'}
                            placeholder="Select Year"
                            initialValue={editTutorEditQualificationData?.completion_date}
                            fieldProps={{
                                picker: 'year',
                                format: 'YYYY'
                            }}
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                    </ProForm.Group>
                </ProCard>
            </ModalForm>

            <ModalForm
            open={editTutorDeleteQualificationModelOpen}
            onOpenChange={setEditTutorDeleteQualificationModelOpen}
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

                request('/api/qualifications/' + editTutorDeleteQualificationConfirmationData?.id, {

                     method: 'DELETE',
                
                }).then(async (api_response) => {
                    console.log('api_response');
                    console.log(api_response);
            
                    if (api_response.status === true) {
            
                        // await waitTime(3000);
            
                        console.log('api_response.status');
            
                        await message.success('Deleted successfully');
            
                        if (qualificationsTableRef.current) {
                            qualificationsTableRef.current?.reloadAndRest?.();
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
              Are you sure you want to delete this qualification?
            </h6>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> ID: </strong> {editTutorDeleteQualificationConfirmationData?.id}
            </span>

            <br/>
            
            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> University/Institution: </strong> {editTutorDeleteQualificationConfirmationData?.institute}
            </span>

            <br/>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Degree: </strong> {editTutorDeleteQualificationConfirmationData?.degree}
            </span>

            <Divider style={{margin: '10px 0px'}}/>

            <p style={{fontSize: '16px', paddingLeft: '30px'}}>
              Please confirm if you would like to proceed with deleting this qualification.
            </p>

            <span style={{fontSize: '16px', paddingLeft: '30px', color: 'red'}} >
                Note: This action cannot be undone.
            </span>

          </ModalForm>

          <ModalForm
                open={editTutorCreateExperienceModelOpen}
                onOpenChange={setEditTutorCreateExperienceModelOpen}
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
                width: 1200,
                okText: 'Create',
                }}
                submitter={{
                    // Configure the properties of the button
                    resetButtonProps: {
                        style: {
                        // Hide the reset button
                        //   display: 'none',
                        },
                    },
                    submitButtonProps: {
                        style: {
                        // Hide the submit button
                        //   display: 'none',
                        },
                    },
                }}
                grid={true}
                preserve={false}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await waitTime(2000);
                    /**
                     * Call the APIs to update the selected policy's users association
                     */
                    const experience_data = {
                        user_id: userId,
                        title: values?.title,
                        organization: values?.organization,
                        start_date: moment(new Date(values?.start_date)).format('YYYY-MM-DD'),
                        end_date: moment(new Date(values?.end_date)).format('YYYY-MM-DD'),
                    };
                
                    console.log('experience_data');
                    console.log(experience_data);
                
                    /**
                     * API Request
                    */
                
                    request('/api/experiences', {
                        method: 'POST',
                        data: experience_data,
                
                    }).then(async (api_response) => {
                        console.log('api_response');
                        console.log(api_response);
                
                        /**
                         * Experience Created then show message and redirect to listing screen
                         */
                        if (api_response?.data?.id > 0) {
                            await waitTime(3000);
                            
                            message.success('Submitted successfully');

                            if (experiencesTableRef.current) {
                                experiencesTableRef.current?.reloadAndRest?.();
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
                <ProCard
                    title="Create Experience"
                    bordered
                    headerBordered
                    size="default"
                    type="inner"
                    style={{
                        marginBlockEnd: 15,
                        minWidth: 800,
                        maxWidth: '100%',
                    }}
                >
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'title'}
                            label="Job Title"
                            placeholder="Type Your Job Title"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'organization'}
                            label="Institution/Organization"
                            placeholder="Type Your Institution/Organization"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormDatePicker
                            label="Start Date"
                            name={'start_date'}
                            // fieldProps={{
                            //     picker: 'year',
                            //     format: 'YYYY'
                            // }}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormDatePicker
                            label="End Date"
                            name={'end_date'}
                            // fieldProps={{
                            //     picker: 'year',
                            //     format: 'YYYY'
                            // }}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                </ProCard>
            </ModalForm>

            <ModalForm
                open={editTutorEditExperienceModelOpen}
                onOpenChange={setEditTutorEditExperienceModelOpen}
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
                width: 1200,
                okText: 'Update',
                }}
                submitter={{
                    // Configure the properties of the button
                    resetButtonProps: {
                        style: {
                        // Hide the reset button
                        //   display: 'none',
                        },
                    },
                    submitButtonProps: {
                        style: {
                        // Hide the submit button
                        //   display: 'none',
                        },
                    },
                }}
                grid={true}
                preserve={false}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await waitTime(2000);
                    /**
                     * Call the APIs to update the selected policy's users association
                     */
                    const experience_data = {
                        // user_id: tutorID,
                        title: values?.title,
                        organization: values?.organization,
                        start_date: moment(new Date(values?.start_date)).format('YYYY-MM-DD'),
                        end_date: moment(new Date(values?.end_date)).format('YYYY-MM-DD'),
                    };
                
                    console.log('experience_data');
                    console.log(experience_data);
                
                    /**
                     * API Request
                    */
                
                    request('/api/experiences/' + editTutorEditExperienceData?.id, {
                        method: 'PUT',
                        data: experience_data,
                
                    }).then(async (api_response) => {
                        console.log('api_response');
                        console.log(api_response);
                
                        /**
                         * Experience Created then show message and redirect to listing screen
                         */
                        if (api_response?.data?.id > 0) {
                            await waitTime(3000);
                            
                            message.success('Submitted successfully');

                            if (experiencesTableRef.current) {
                                experiencesTableRef.current?.reloadAndRest?.();
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
                <ProCard
                    title="Edit Experience"
                    bordered
                    headerBordered
                    size="default"
                    type="inner"
                    style={{
                        marginBlockEnd: 15,
                        minWidth: 800,
                        maxWidth: '100%',
                    }}
                >
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'title'}
                            label="Job Title"
                            initialValue={editTutorEditExperienceData?.title}
                            placeholder="Type Your Job Title"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'organization'}
                            label="Institution/Organization"
                            initialValue={editTutorEditExperienceData?.organization}
                            placeholder="Type Your Institution/Organization"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormDatePicker
                            label="Start Date"
                            name={'start_date'}
                            initialValue={editTutorEditExperienceData?.start_date}
                            // fieldProps={{
                            //     picker: 'year',
                            //     format: 'YYYY'
                            // }}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormDatePicker
                            label="End Date"
                            name={'end_date'}
                            initialValue={editTutorEditExperienceData?.end_date}
                            // fieldProps={{
                            //     picker: 'year',
                            //     format: 'YYYY'
                            // }}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                </ProCard>
            </ModalForm>

            <ModalForm
            open={editTutorDeleteExperienceModelOpen}
            onOpenChange={setEditTutorDeleteExperienceModelOpen}
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

              request('/api/experiences/' + editTutorDeleteExperienceConfirmationData?.id, {

                        method: 'DELETE',
                
                    }).then(async (api_response) => {
                        console.log('api_response');
                        console.log(api_response);
                
                        if (api_response.status === true) {
                
                            // await waitTime(3000);
                
                            console.log('api_response.status');
                
                            await message.success('Deleted successfully');
                
                            if (experiencesTableRef.current) {
                                experiencesTableRef.current?.reloadAndRest?.();
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
              Are you sure you want to delete this experience?
            </h6>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> ID: </strong> {editTutorDeleteExperienceConfirmationData?.id}
            </span>

            <br/>
            
            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Job Title: </strong> {editTutorDeleteExperienceConfirmationData?.title}
            </span>

            <br/>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Institution/Organization: </strong> {editTutorDeleteExperienceConfirmationData?.organization}
            </span>

            <Divider style={{margin: '10px 0px'}}/>

            <p style={{fontSize: '16px', paddingLeft: '30px'}}>
              Please confirm if you would like to proceed with deleting this experience.
            </p>

            <span style={{fontSize: '16px', paddingLeft: '30px', color: 'red'}} >
                Note: This action cannot be undone.
            </span>

          </ModalForm>

            </PageContainer>
        );

};

export default UpdateProfile;
