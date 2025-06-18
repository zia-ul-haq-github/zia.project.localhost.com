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
import { message, Form, Row, Col, Button } from 'antd';
import { PlusOutlined, PercentageOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from "react";
import { request, history } from '@umijs/max';
import { useParams, useModel } from "@@/exports";
import ListQuestions from './questions/list-questions';

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
    status: '',
    passing_percentage: '',
    attempts_limit: '',
    class_id: '',
    users: '',
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
            passing_percentage: values?.passing_percentage,
            attempts_limit: values?.attempts_limit,
            author_id: authorId,
            class_id: values?.class_id,
            users: values?.users?.map( ( user ) => user?.user ) || [],
        };

        return await request('/api/quizzes/' + values?.quiz_id, {
            method: 'PUT',
            data: request_data,

        }).then(async (api_response) => {

            /**
             * Quiz Updated then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
                history.push('/tutor-app/quizzes/edit/' + api_response?.data?.id);
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


const UpdateQuiz = () => {

    const params = useParams();

    /**
     * States of Component
     */

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
    const [authorId, setAuthorId] = useState(0);
    const [form] = Form.useForm();
    const questionsTableRef = useRef();
    const [ allClasses, setAllClasses ] = useState( [] );
    const [ allUsers, setAllUsers ] = useState( [] );
    const [ quizId, setQuizId ] = useState(0);

    /**
     * Set Quiz AuthorId who's created the quiz
     */
    useEffect(() => {
        setAuthorId(initialState?.currentUser?.id);
    }, []); //empty dependency array so it only runs once at render

    useEffect(() => {
        setQuizId(params.id);
    }, []); // empty dependency array so it only runs once at render

    /**
     * Start - Classes Data
     */
    useEffect( () => {
        return request('/api/classes', {
    
        }).then( ( api_response ) => {
            const table_data = api_response.data.data.map( ( item, i ) => ( {
                value: item?.id,
                label: item?.title,
            } ) );
    
            setAllClasses( table_data );
    
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
            
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col flex="auto">
                
                    </Col>
                
                    <Col flex="100px">
                        <Button
                            type="primary"
                            key="new"
                            onClick={() => {
                                history.push('/tutor-app/quizzes/new');
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
                    initialValues={initialValues}
                    form={form}
                    params={ { 'quiz_id': quizId } }
                    request={
                                        
                        async (params= {} ) => {
                    
                            if( params?.quiz_id == 0 ) {
                                return;
                            }
                    
                            await waitTime(2000);
                    
                            return await request('/api/quizzes/' + params?.quiz_id, {
                                method: 'GET',
                            }).then(async (api_response) => {
                    
                                return {
                                    ...initialValues,
                                        title: api_response?.data?.title,
                                        description: api_response?.data?.description,
                                        status: api_response?.data?.status,
                                        passing_percentage: api_response?.data?.passing_percentage,
                                        attempts_limit: api_response?.data?.attempts_limit,
                                        class_id: api_response?.data?.class_id,
                                        users: api_response?.data?.users?.map( ( user ) => ( {
                                            user: user?.id
                                        } ) ) || []
                                };
                    
                            }).catch(function (error) {
                                console.log(error);
                            });
                    
                        }
                    }
                    onFinish={async (values) => {
                        await waitTime(2000);
                        values.quiz_id = quizId;
                        values.author_id = authorId;
                        await onFinishHandlerForm(values, authorId);
                    }}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    }}
                >
                
                    <ProCard
                        title="Quiz Details"
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
                                placeholder="Type Quiz Title"
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
                                placeholder="Share a little description to fill out your quiz."
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
								colProps={ { xs: 24, sm: 24, md: 8, lg: 8, xl: 8 } }
							/>
                            <ProFormText
                                name={ 'passing_percentage' }
                                label="Passing Percentage"
                                placeholder="Type Passing Percentage"
                                rules={ [ { required: true } ] }
                                fieldProps={{
                                    suffix: <PercentageOutlined />
                                }}
                                colProps={ { xs: 24, sm: 24, md: 8, lg: 8, xl: 8 } }
                            />
                            <ProFormText
                                name={ 'attempts_limit' }
                                label="Attempts Limit"
                                placeholder="Type Attempts Limit"
                                rules={ [ { required: true } ] }
                                colProps={ { xs: 24, sm: 24, md: 8, lg: 8, xl: 8 } }
                            />
                        </ProForm.Group>
                        <ProForm.Group size={ 24 }>
                            <ProFormSelect
                                name={ 'class_id' }
                                label="Classes"
                                showSearch
                                options={ allClasses }
                                debounceTime={ 300 }
                                placeholder="Please Select a Class"
                                rules={ [ { required: true } ] }
                                colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
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

                    <ListQuestions
                        questionsTableRef={ questionsTableRef }
                        quizID={ quizId }
                        authorID={ authorId }
                    />,
                    
                </ProForm>
                
        </PageContainer>
    );

};

export default UpdateQuiz;
