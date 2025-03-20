import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProTable,
    ProFormDatePicker,
    StepsForm,
    ModalForm
} from '@ant-design/pro-components';
import {Row, Col, message, Button, Form, Image, Upload, Steps, Divider} from 'antd';
import {UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import React, {useRef, useState} from "react";
import {request, history} from '@umijs/max';

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
 * Form Submission handler and API Request Performer
 */
const onFinishHandlerStepsForm = async (values, tutorID) => {
    console.log('onFinishHandlerStepsForm');
    console.log('Received values of form: ', values);

    message.success('Submitted successfully');
    history.push('/admin-app/tutors/edit/' + tutorID);
    
};


const CreateTutor = () => {

    /**
     * States of Component
     */

    const [form] = Form.useForm();
    const qualificationsTableRef = useRef();
    const experiencesTableRef = useRef();

    const [imageUrl, setImageUrl] = useState(DEFAULT_USER_PROFILE_IMAGE_URL);
    
    const [tutorID, setTutorID] = useState({});
    const [createTutorCreateQualificationModelOpen, setCreateTutorCreateQualificationModelOpen] = useState(false);

    const [createTutorEditQualificationData, setCreateTutorEditQualificationData] = useState({});
    const [createTutorEditQualificationModelOpen, setCreateTutorEditQualificationModelOpen] = useState(false);

    const [createTutorDeleteQualificationConfirmationData, setCreateTutorDeleteQualificationConfirmationData] = useState({});
    const [createTutorDeleteQualificationModelOpen, setCreateTutorDeleteQualificationModelOpen] = useState(false);

    const [createTutorCreateExperienceModelOpen, setCreateTutorCreateExperienceModelOpen] = useState(false);

    const [createTutorEditExperienceData, setCreateTutorEditExperienceData] = useState({});
    const [createTutorEditExperienceModelOpen, setCreateTutorEditExperienceModelOpen] = useState(false);

    const [createTutorDeleteExperienceConfirmationData, setCreateTutorDeleteExperienceConfirmationData] = useState({});
    const [createTutorDeleteExperienceModelOpen, setCreateTutorDeleteExperienceModelOpen] = useState(false);


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
                        setCreateTutorEditQualificationData(record);
                        setCreateTutorEditQualificationModelOpen(true);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        setCreateTutorDeleteQualificationConfirmationData(record);

                        setCreateTutorDeleteQualificationModelOpen(true);

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
                        setCreateTutorEditExperienceData(record);
                        setCreateTutorEditExperienceModelOpen(true);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        setCreateTutorDeleteExperienceConfirmationData(record);
                        setCreateTutorDeleteExperienceModelOpen(true);

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
            <StepsForm
                onFinish={async (values) => {
                    await waitTime(1000);
                    return await onFinishHandlerStepsForm(values, tutorID);
                }}
                formProps={{
                    validateMessages: {
                        required: 'This is required',
                    },
                }}
                submitter={{
                    render: (_, dom) => {
                        return (<FooterToolbar>{dom}</FooterToolbar>)
                    },
                }}
                // You can use the stepsRender attribute to customize the step bar, refer to the following
                stepsRender={(steps, dom) => {
                    return (
                        <Steps current={dom?.props?.children?.props?.current}>
                            {[
                            {key: "personal_details", title: "Personal Details"},
                            {key: "qualification_and_experience_details", title: "Qualification & Experience Details"}
                            ].map((item) => (
                            <Steps.Step key={item.key} title={item.title}/>
                            ))}
                        </Steps>
                    );
                return dom;
                }}
            >
                <StepsForm.StepForm
                    name="personal_details"
                    title="Personal Details"
                    onFinish={async (values) => {
                        await waitTime(2000);
                        const request_data = {
                            // image_base_64: values?.image_base_64,
                            // image_base_64: imageUrl,
                            image_url: imageUrl,
                            name: values?.name,
                            email: values?.email,
                            role: 'tutor',
                            mobile_no: values?.mobile_no,
                            date_of_birth: moment(new Date(values?.date_of_birth)).format('YYYY-MM-DD'),
                            bio_data: values?.bio_data,
                            password: values?.password,
                        };
                    
                        console.log('request_data');
                        console.log(request_data);
                    
                        /**
                         * API Request
                        */
                    
                        request('/api/users', {
                            method: 'POST',
                            data: request_data,
                    
                        }).then(async (api_response) => {
                            console.log('api_response');
                            console.log(api_response);
                    
                            /**
                             * User Created then show message and redirect to listing screen
                             */
                            if (api_response?.data?.id > 0) {
                                setTutorID(api_response?.data?.id);
                            }
                    
                        }).catch(function (error) {
                            console.log(error);
                        });
                        return true;
                    }}
                    layout='vertical'
                    grid={true}
                    //   initialValues={initialValues}
                    form={form}
                >
                
                    <ProCard
                        title="BIO Details"
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
                                        />
                                    </Col>
                                    <Col span={24} style={{ textAlign: 'center'}}>
                                    {/* getValueFromEvent={getFile} */}
                                        <ProForm.Item name='image_url' getValueFromEvent={getFile} > 
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
                                                // customRequest={(event) => {
                                                //     console.log('event = file is uploading');
                                                //     console.log(event);

                                                //     console.log('event?.file');
                                                //     console.log(event?.file);

                                                //     request('/api/file-manager/upload', {
                                                //         method: 'POST',
                                                //         data: {
                                                //            'filename': event?.file?.name,
                                                //             // 'directory': 'users' 
                                                //             ...event?.data
                                                //         },
                                                //     }).then(async (api_response) => {
                                                //         console.log('api_response');
                                                //         console.log(api_response);
                                                //     });

                                                // }}
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
                                <ProForm.Group size={24}>
                                    <ProFormText.Password
                                        name={'password'}
                                        label="Password"
                                        placeholder="Please type a password"
                                        rules={[{required: true}]}
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                    <ProFormText.Password
                                        name={'password_confirmation'}
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        placeholder="Please type a confirm password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                </ProForm.Group>
                            </Col>
                        </Row>
                    </ProCard>
                </StepsForm.StepForm>
                <StepsForm.StepForm
                    name="qualification_and_experience_details"
                    title="Qualification & Experience Details"
                    onFinish={async () => {
                        await waitTime(2000);
                        return true;
                    }}
                    layout='vertical'
                    grid={true}
                    //   initialValues={initialValues}
                    //   form={form}
                >
                
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
                                        setCreateTutorCreateQualificationModelOpen(true);
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
                                        setCreateTutorCreateExperienceModelOpen(true);
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
                                    await waitTime(2000);

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
                </StepsForm.StepForm>
            </StepsForm>

            <ModalForm
                open={createTutorCreateQualificationModelOpen}
                onOpenChange={setCreateTutorCreateQualificationModelOpen}
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
                        user_id: tutorID,
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
                open={createTutorEditQualificationModelOpen}
                onOpenChange={setCreateTutorEditQualificationModelOpen}
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
                
                    request('/api/qualifications/' + createTutorEditQualificationData?.id, {
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
                            initialValue={createTutorEditQualificationData?.institute}
                            placeholder="Type Your University/Institution Name"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'degree'}
                            label="Degree"
                            initialValue={createTutorEditQualificationData?.degree}
                            placeholder="Type Your Degree"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'board'}
                            label="Board"
                            initialValue={createTutorEditQualificationData?.board}
                            placeholder="Type Your Board Name"
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                        <ProFormText
                            name={'grade'}
                            label="Grade"
                            initialValue={createTutorEditQualificationData?.grade}
                            placeholder="Type Your Grade"
                            colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                        />
                        <ProFormDatePicker
                            label="Year of Completion"
                            name={'year_of_completion'}
                            placeholder="Select Year"
                            initialValue={createTutorEditQualificationData?.completion_date}
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
            open={createTutorDeleteQualificationModelOpen}
            onOpenChange={setCreateTutorDeleteQualificationModelOpen}
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

                request('/api/qualifications/' + createTutorDeleteQualificationConfirmationData?.id, {

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
                <strong> ID: </strong> {createTutorDeleteQualificationConfirmationData?.id}
            </span>

            <br/>
            
            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> University/Institution: </strong> {createTutorDeleteQualificationConfirmationData?.institute}
            </span>

            <br/>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Degree: </strong> {createTutorDeleteQualificationConfirmationData?.degree}
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
                open={createTutorCreateExperienceModelOpen}
                onOpenChange={setCreateTutorCreateExperienceModelOpen}
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
                        user_id: tutorID,
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
                open={createTutorEditExperienceModelOpen}
                onOpenChange={setCreateTutorEditExperienceModelOpen}
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
                
                    request('/api/experiences/' + createTutorEditExperienceData?.id, {
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
                            initialValue={createTutorEditExperienceData?.title}
                            placeholder="Type Your Job Title"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'organization'}
                            label="Institution/Organization"
                            initialValue={createTutorEditExperienceData?.organization}
                            placeholder="Type Your Institution/Organization"
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormDatePicker
                            label="Start Date"
                            name={'start_date'}
                            initialValue={createTutorEditExperienceData?.start_date}
                            // fieldProps={{
                            //     picker: 'year',
                            //     format: 'YYYY'
                            // }}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormDatePicker
                            label="End Date"
                            name={'end_date'}
                            initialValue={createTutorEditExperienceData?.end_date}
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
            open={createTutorDeleteExperienceModelOpen}
            onOpenChange={setCreateTutorDeleteExperienceModelOpen}
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

              request('/api/experiences/' + createTutorDeleteExperienceConfirmationData?.id, {

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
                <strong> ID: </strong> {createTutorDeleteExperienceConfirmationData?.id}
            </span>

            <br/>
            
            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Job Title: </strong> {createTutorDeleteExperienceConfirmationData?.title}
            </span>

            <br/>

            <span style={{fontSize: '16px', paddingLeft: '30px'}}>
                <strong> Institution/Organization: </strong> {createTutorDeleteExperienceConfirmationData?.organization}
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

export default CreateTutor;
