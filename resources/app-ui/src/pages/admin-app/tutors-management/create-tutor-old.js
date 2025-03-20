import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProTable,
    ProFormDatePicker
} from '@ant-design/pro-components';
import {Row, Col, message, Button, Form, Image, Upload} from 'antd';
import {UploadOutlined, PlusOutlined} from '@ant-design/icons';
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
const onFinishHandlerForm = async (values) => {
    console.log('onFinishHandlerForm');
    console.log('Received values of form: ', values);


    const formData = new FormData();
    console.log('formData - before');
    console.log(formData);

    formData.append('image_base_64', values?.image);
    formData.append('name', values?.name);
    formData.append('email', values?.email);
    formData.append('bio_data', values?.bio_data);
    formData.append('password', values?.password);
    formData.append('password_confirmation', values?.password_confirmation);

    console.log('formData - after');
    console.log(formData);

    /**
     * API Request
     */
    try {

        const request_data = {
            image_base_64: values?.image_base_64,
            name: values?.name,
            email: values?.email,
            role: 'tutor',
            bio_data: values?.bio_data,
            mobile_no: '03123456789',
            date_of_birth: moment(new Date('2000-5-27')).format('YYYY-MM-DD'),
            password: values?.password,
        };

        console.log('request_data');
        console.log(request_data);

        return await request('/api/users', {
            method: 'POST',
            data: request_data,

        }).then(async (api_response) => {
            console.log('api_response');
            console.log(api_response);

            /**
             * User Created then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
                history.push('/admin-app/tutors/edit/' + api_response?.data?.id);
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


const CreateTutor = () => {

    /**
     * States of Component
     */

    const [form] = Form.useForm();
    const qualificationsTableRef = useRef();
    const experiencesTableRef = useRef();

    const [imageUrl, setImageUrl] = useState(DEFAULT_USER_PROFILE_IMAGE_URL);


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if( info.file.status == "removed" ){
            setImageUrl('');
        }

        if (info.file.status === 'done') {
            getBase64(info).then((base64String) => {
                console.log('base64String');
                console.log(base64String);
                setImageUrl(base64String);
            });

        }

        if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    };


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
            dataIndex: 'university_institution',
            key: 'table-column-university-institution',
            copyable: true,
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
            title: "Year of Completion",
            dataIndex: 'year_of_completion',
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
                        // history.push('/admin-app/tutors/edit/' + record.id);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        // setTutorDeleteConfirmationData(record);

                        // setTutorDeleteConfirmationModelOpen(true);

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
            dataIndex: 'job_title',
            key: 'table-column-job-title',
            copyable: true,
            hideInSearch: true,
        },
        {
            title: "Institution/Organization",
            dataIndex: 'institution_organization',
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
                        // history.push('/admin-app/tutors/edit/' + record.id);
                    }}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    key="deletable"
                    onClick={() => {

                        // setTutorDeleteConfirmationData(record);

                        // setTutorDeleteConfirmationModelOpen(true);

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
                    onFinish={async (values) => {
                        console.log(values);

                        await waitTime(1000);

                        values.image_base_64 = imageUrl;

                        await onFinishHandlerForm(values);
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
                                        <ProForm.Item name='image_base_64' getValueFromEvent={getFile}>
                                            <Upload
                                                name={'image_base_64'}
                                                onChange={handleChange}
                                                maxCount={1}
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
                                        // history.push('/admin-app/tutors/new');
                                    }}
                                >
                                    <PlusOutlined/> New
                                </Button>,
                            ]}
                            // dataSource={TableListItem}
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
                                        // history.push('/admin-app/tutors/new');
                                    }}
                                >
                                    <PlusOutlined/> New
                                </Button>,
                            ]}
                            // dataSource={TableListItem}
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
                            columns={experienceColumns}
                        />

                    </ProCard>

                </ProForm>
            </PageContainer>
        );

};

export default CreateTutor;
