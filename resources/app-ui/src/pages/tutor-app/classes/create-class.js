import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormList,
    ProFormSelect,
    ProFormSegmented
} from '@ant-design/pro-components';
import { message, Form } from 'antd';
import React, { useEffect, useState } from "react";
import { request, history } from '@umijs/max';
import { useModel } from "@@/exports";

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const initialValues = {
    users: [
        {
            user: undefined, // Shows 1 empty dropdown
        },
    ]
};


/**
 * Form Submission handler and API Request Performer
 */
const onFinishHandlerForm = async (values, authorId) => {
    console.log('onFinishHandlerForm');
    console.log('Received values of form: ', values);

    /**
     * API Request
     */
    try {

        const request_data = {
            title: values?.title,
            description: values?.description,
            status: values?.status,
            author_id: authorId,
            category_id: values?.category_id,
            users: values?.users?.map( ( user ) => user?.user ) || [],
        };

        return await request('/api/classes', {
            method: 'POST',
            data: request_data,

        }).then(async (api_response) => {

            /**
             * Class Created then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
                history.push('/tutor-app/classes/edit/' + api_response?.data?.id);
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


const CreateClass = () => {

    /**
     * States of Component
     */

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
    const [authorId, setAuthorId] = useState(0);
    const [form] = Form.useForm();
    const [ allCategories, setAllCategories ] = useState( [] );
    const [ allUsers, setAllUsers ] = useState( [] );

    /**
     * Set Class AuthorId who's created the class
     */
    useEffect(() => {
        setAuthorId(initialState?.currentUser?.id);
    }, []); //empty dependency array so it only runs once at render

    /**
     * Start - Categories Data
     */
    useEffect( () => {
        return request('/api/categories', {
    
        }).then( ( api_response ) => {
            const table_data = api_response.data.data.map( ( item, i ) => ( {
                value: item?.id,
                label: item?.title,
            } ) );
    
            setAllCategories( table_data );
    
            return table_data;
        } );
    }, [] );

    /**
     * Start - Users Data
     */
    useEffect( () => {
        return request('/api/users', {
    
            params: {
                role: 'user',
                page: 1,
                per_page: 1000,
            },
    
        }).then( ( api_response ) => {
            const table_data = api_response.data.data.map( ( item, i ) => ( {
                value: item?.id,
                label: item?.name,
            } ) );
    
            setAllUsers( table_data );
    
            return table_data;
        } );
    }, [] );

    /**
     * The Component Output
     */

    return (
        <PageContainer>
            
                <ProForm
                    onFinish={async (values) => {
                        await waitTime(2000);
                        await onFinishHandlerForm(values, authorId);
                    }}
                    layout='vertical'
                    grid={true}
                    initialValues={initialValues}
                    form={form}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    }}
                >
                
                    <ProCard
                        title="Class Details"
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
                                placeholder="Type Class Title"
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
                                placeholder="Share a little description to fill out your class."
                                colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                            />
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormSegmented
								name={ 'status' }
								label="Status"
								initialValue="in-active"
								valueEnum={ {
									'in-active': 'In-Active',
									active: 'Active',
								} }
								colProps={ { xs: 24, sm: 24, md: 6, lg: 6, xl: 6 } }
							/>
                            <ProFormSelect
                                name={ 'category_id' }
                                label="Categories"
                                showSearch
                                options={ allCategories }
                                debounceTime={ 300 }
                                placeholder="Please Select a Category"
                                rules={ [ { required: true } ] }
                                colProps={ { xs: 24, sm: 24, md: 18, lg: 18, xl: 18 } }
                            />
                        </ProForm.Group>
                        
                    </ProCard>

                    <ProCard
                        title="Assign Users"
                        bordered
                        headerBordered
                        collapsible
                        size="default"
                        type="inner"
                        style={ {
                            marginBlockEnd: 15,
                            minWidth: 800,
                            maxWidth: '100%',
                        } }
                    >
                        <ProForm.Group size={ 24 }>
                            <ProFormList
                                name={ 'users' }
                                min={ 1 }
                                copyIconProps={ { tooltipText: 'Copy this user' } }
                                deleteIconProps={ { tooltipText: 'Delete this user' } }
                                creatorButtonProps={ {
                                    creatorButtonText: 'Add New User',
                                } }
                            >
                                <ProForm.Group size={ 24 }>
                                    <ProFormSelect
                                        name={ 'user' }
                                        label="User"
                                        showSearch
                                        options={ allUsers }
                                        debounceTime={ 300 }
                                        placeholder="Please Select a User"
                                        rules={ [ { required: true } ] }
                                        colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                                    />
                                </ProForm.Group>
                            </ProFormList>
                        </ProForm.Group>
                    </ProCard>
                    
                </ProForm>
                
        </PageContainer>
    );

};

export default CreateClass;
