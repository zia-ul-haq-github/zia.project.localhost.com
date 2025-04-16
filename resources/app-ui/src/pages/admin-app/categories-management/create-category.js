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
const onFinishHandlerForm = async (values) => {
    console.log('onFinishHandlerForm');
    console.log('Received values of form: ', values);
    
};


const CreateCategory = () => {

    /**
     * States of Component
     */

    const [form] = Form.useForm();

    const [imageUrl, setImageUrl] = useState(DEFAULT_PLACEHOLDER_IMAGE_URL);


    /**
     * The Component Output
     */

    return (
        <PageContainer>
            
                <ProForm
                    onFinish={async (values) => {
                        await waitTime(2000);

                        await onFinishHandlerForm(values);
                    }}
                    layout='vertical'
                    grid={true}
                    //   initialValues={initialValues}
                    form={form}
                >
                
                    <ProCard
                        title="Category Details"
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
                                                    'directory': 'categories'
                                                }}
                                                onRemove={(file) => {
                                                    console.log('file is removed');
                                                    console.log(file);

                                                    request('/api/file-manager/delete', {
                                                        method: 'DELETE',
                                                        data: {
                                                           'filename': file?.name,
                                                            'directory': 'categories' 
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
                                        name={'title'}
                                        label="Title"
                                        placeholder="Type Category Title"
                                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                    />
                                </ProForm.Group>
                                <ProForm.Group size={24}>
                                    <ProFormTextArea
                                        name={'description'}
                                        label="Description"
                                        placeholder="Share a little description to fill out your category."
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

export default CreateCategory;
