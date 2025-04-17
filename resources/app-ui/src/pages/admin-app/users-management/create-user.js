import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormDatePicker,
    StepsForm
} from '@ant-design/pro-components';
import {Row, Col, message, Button, Form, Image, Upload, Steps, Alert} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
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
const onFinishHandlerStepsForm = async (values, userID) => {
    console.log('onFinishHandlerStepsForm');
    console.log('Received values of form: ', values);

    message.success('Submitted successfully');
    history.push('/admin-app/users/edit/' + userID);
    
};

const CreateUser = () => {

    /**
     * States of Component
     */

    const [form] = Form.useForm();

    const [imageUrl, setImageUrl] = useState(DEFAULT_USER_PROFILE_IMAGE_URL);
    
       /**
     * The Component Output
     */

    return (
        <PageContainer>
            <StepsForm
                onFinish={async (values) => {
                    await waitTime(1000);
                    return await onFinishHandlerStepsForm(values, userID);
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
                            {key: "qualification_and_experience_details", title: "Dummy Data"}
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
                            role: 'user',
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
                
                <Alert message=" testing message 123" type="success" />;
                            
                </StepsForm.StepForm>
            </StepsForm>

        </PageContainer>
    );
};

export default CreateUser;