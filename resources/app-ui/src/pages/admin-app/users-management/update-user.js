import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormDatePicker
} from '@ant-design/pro-components';
import { Row, Col, message, Button, Form, Image, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { request, history } from '@umijs/max';
import { useParams } from "@@/exports";

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
                history.push('/admin-app/users/edit/' + api_response?.data?.id);
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


const UpdateUser = () => {

    const params = useParams();

    /**
     * States of Component
     */

    const [form] = Form.useForm();
    const [userId, setUserId] = useState(0);
    const [userProfileImageUrl, setUserProfileImageUrl] = useState('');
    const [imageUrl, setImageUrl] = useState(userProfileImageUrl);

    useEffect(() => {
        setUserId(params.id);
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

   
    /**
     * The Component Output
     */

        return (
            <PageContainer>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col flex="auto">

                    </Col>

                    <Col flex="100px">
                        <Button
                        type="primary"
                        key="new"
                        onClick={() => {
                            history.push('/admin-app/users/new');
                        }}
                        style={{marginBlockEnd: 15}}
                        >
                        <PlusOutlined/> New
                        </Button>
                    </Col>
                </Row>

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
                                            fallback={('' !== imageUrl || null === imageUrl ? imageUrl : DEFAULT_USER_PROFILE_IMAGE_URL)}
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
                                        fieldProps={ {
                                            rows: 6,
                                        } }
                                        placeholder="Share a little biographical information to fill out your profile. This may be shown publicly. "
                                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                    />
                                </ProForm.Group>
                            </Col>
                        </Row>
                    </ProCard>

                </ProForm>

            </PageContainer>
        );
};

export default UpdateUser;
