import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea
} from '@ant-design/pro-components';
import { message, Form } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { request, history } from '@umijs/max';
import { useParams, useModel } from "@@/exports";

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

    /**
     * API Request
     */
    try {

        const request_data = {
            title: values?.title,
            description: values?.description,
            fee_amount: values?.fee_amount,
            service_charges_amount: values?.service_charges_amount,
        };

        return await request('/api/fee-packages', {
            method: 'POST',
            data: request_data,

        }).then(async (api_response) => {

            /**
             * Fee Package Created then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
                history.push('/tutor-app/fee-packages/edit/' + api_response?.data?.id);
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


const CreateFeePackage = () => {

    const params = useParams();

    /**
     * States of Component
     */

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
    const [form] = Form.useForm();

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
                    // initialValues={initialValues}
                    form={form}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    }}
                >
                
                    <ProCard
                        title="Fee Package Details"
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

                        <ProForm.Group size={ 24 }>
                            <ProFormText
                                name={ 'title' }
                                label="Title"
                                placeholder="Type Fee Package Title"
                                rules={ [ { required: true } ] }
                                colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                            />
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormTextArea
                                name={ 'description' }
                                label="Description"
                                fieldProps={ {
                                    rows: 6,
                                } }
                                rules={ [ { required: true } ] }
                                placeholder="Share a little description to fill out your fee package."
                                colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                            />
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormText
                                name={ 'fee_amount' }
                                label="Fee Amount"
                                placeholder="Type Fee Amount"
                                rules={ [ { required: true } ] }
                                fieldProps={{
                                    suffix: <DollarOutlined />
                                }}
                                colProps={ { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 } }
                            />
                            <ProFormText
                                name={ 'service_charges_amount' }
                                label="Service Charges Amount"
                                placeholder="Type Service Charges Amount"
                                initialValue={25}
                                // rules={ [ { required: true } ] }
                                fieldProps={{
                                    readOnly: true,
                                    suffix: <DollarOutlined />
                                }}
                                colProps={ { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 } }
                            />
                        </ProForm.Group>
                        
                    </ProCard>
                    
                </ProForm>
                
        </PageContainer>
    );

};

export default CreateFeePackage;
