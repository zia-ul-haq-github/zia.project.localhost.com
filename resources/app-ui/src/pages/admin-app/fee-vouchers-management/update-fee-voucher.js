import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormSegmented,
    ProFormDatePicker,
    ProFormUploadDragger
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

const initialValues = {
    title: '',
    description: '',
    amount: '',
    due_date: '',
    status: '',
    payment_proof_image_url: '',
    verification_status: ''
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
            verification_status: values?.verification_status,
        };

        return await request('/api/fee-vouchers/' + values.fee_voucher_id, {
            method: 'PUT',
            data: request_data,

        }).then(async (api_response) => {

            /**
             * Fee Voucher Updated then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
                history.push('/admin-app/fee-vouchers/edit/' + api_response?.data?.id);
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


const UpdateFeeVoucher = () => {

    const params = useParams();

    /**
     * States of Component
     */

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
    const [form] = Form.useForm();
    const [ feeVoucherId, setFeeVoucherId ] = useState(0);

    useEffect(() => {
        setFeeVoucherId(params.id);
    }, []); // empty dependency array so it only runs once at render


    /**
     * The Component Output
     */

    return (
        <PageContainer>
            
                <ProForm
                    layout='vertical'
                    grid={true}
                    initialValues={initialValues}
                    form={form}
                    params={ { 'fee_voucher_id': feeVoucherId } }
                    request={
                                                            
                        async (params= {} ) => {
                    
                            if( params?.fee_voucher_id == 0 ) {
                                return;
                            }
                    
                            await waitTime(2000);
                    
                            return await request('/api/fee-vouchers/' + params?.fee_voucher_id, {
                                method: 'GET',
                            }).then(async (api_response) => {
                    
                                return {
                                    ...initialValues,
                                        title: api_response?.data?.title,
                                        description: api_response?.data?.description,
                                        amount: api_response?.data?.amount,
                                        due_date: api_response?.data?.due_date,
                                        status: api_response?.data?.status,
                                        payment_proof_image_url: api_response?.data?.payment_proof_image_url,
                                        verification_status: api_response?.data?.verification_status
                                };
                    
                            }).catch(function (error) {
                                console.log(error);
                            });
                    
                        }
                    }
                    onFinish={async (values) => {
                        await waitTime(2000);
                        values.fee_voucher_id = feeVoucherId;
                        await onFinishHandlerForm(values);
                    }}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    }}
                >
                
                    <ProCard
                        title="Fee Voucher Details"
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
                                fieldProps={{
                                    readOnly: true,
                                }}
                                placeholder="Type Fee Voucher Title"
                                // rules={ [ { required: true } ] }
                                colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                            />
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormTextArea
                                name={ 'description' }
                                label="Description"
                                fieldProps={ {
                                    rows: 6,
                                    readOnly: true
                                } }
                                placeholder="Share a little description to fill out your fee voucher."
                                colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                            />
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormText
                                name={ 'amount' }
                                label="Amount"
                                placeholder="Type Amount"
                                // rules={ [ { required: true } ] }
                                fieldProps={{
                                    readOnly: true,
                                    suffix: <DollarOutlined />
                                }}
                                colProps={ { xs: 24, sm: 24, md: 6, lg: 6, xl: 6 } }
                            />
                            <ProFormDatePicker
                                name={ 'due_date' }
                                label="Due Date"
                                disabled={true}
                                // rules={ [ { required: true } ] }
                                colProps={{xs: 24, sm: 24, md: 6, lg: 6, xl: 6}}
                            />
                            <ProFormSegmented
								name={ 'status' }
								label="Status"
								// initialValue="unpaid"
								valueEnum={ {
									'unpaid': 'Unpaid',
									paid: 'Paid',
								} }
                                disabled={true}
                                // rules={ [ { required: true } ] }
								colProps={ { xs: 24, sm: 24, md: 6, lg: 6, xl: 6 } }
							/>
                            <ProFormSegmented
								name={ 'verification_status' }
								label="Verification Status"
								// initialValue="pending"
								valueEnum={ {
									'pending': 'Pending',
									verified: 'Verified',
								} }
                                rules={ [ { required: true } ] }
								colProps={ { xs: 24, sm: 24, md: 6, lg: 6, xl: 6 } }
							/>
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormUploadDragger
                                name={ 'paymen_proof_image_url' }
                                label="Upload Payment Proof"
                                max={1}
                                title={'Click or drag files into this area to upload'}
                                description={'Supported extension: .jpg .png .docx'}
                                accept={'.jpg, .png, .docx'}
                                disabled={true}
                                // rules={[{ required: true, message: 'Please upload payment proof image' }]}
                                colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                action= {(SITE_URL+"/wp-json/wp/v2/form-document/")}
                                // onChange={ async (info) => {
                                //     if (info.file.status === 'done') {
                                //         setFormDocumentDetails(info.file.response.data);
                                //     }
                                // }}
                            />
                        </ProForm.Group>
                        
                    </ProCard>
                    
                </ProForm>
                
        </PageContainer>
    );

};

export default UpdateFeeVoucher;
