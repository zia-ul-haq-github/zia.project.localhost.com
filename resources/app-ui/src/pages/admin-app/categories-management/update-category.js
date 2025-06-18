import {
    PageContainer,
    FooterToolbar,
    ProCard,
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormList,
    ProFormSelect
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

const initialValues = {
    image_url: '',
    title: '',
    description: '',
    tutors: '',
    users: '',
};


/**
 * Form Submission handler and API Request Performer
 */
const onFinishHandlerForm = async (values, imageUrl) => {
    console.log('onFinishHandlerForm');
    console.log('Received values of form: ', values);

    /**
     * API Request
     */
    try {

        const request_data = {
            image_url: imageUrl,
            title: values?.title,
            description: values?.description,
            author_id: 1,
            tutors: values?.tutors?.map( ( tutor ) => tutor?.tutor ) || [],
            users: values?.users?.map( ( user ) => user?.user ) || [],
        };

        return await request('/api/categories/' + values?.category_id, {
            method: 'PUT',
            data: request_data,

        }).then(async (api_response) => {

            /**
             * Category Updated then show message and redirect to listing screen
             */
            if (api_response?.data?.id > 0) {
                message.success('Submitted successfully');
                history.push('/admin-app/categories/edit/' + api_response?.data?.id);
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


const UpdateCategory = () => {

    const params = useParams();

    /**
     * States of Component
     */

    const [form] = Form.useForm();
    const [categoryId, setCategoryId] = useState(0);

    const [imageUrl, setImageUrl] = useState(DEFAULT_PLACEHOLDER_IMAGE_URL);

    const [ allTutors, setAllTutors ] = useState( [] );
    const [ allUsers, setAllUsers ] = useState( [] );

    useEffect(() => {
        setCategoryId(params.id);
    }, []); // empty dependency array so it only runs once at render


    /**
	 * Start - Tutors Data
	 */
	useEffect( () => {
		return request('/api/users', {

            params: {
                role: 'tutor',
                page: 1,
                per_page: 1000,
            },

        }).then( ( api_response ) => {
			const table_data = api_response.data.data.map( ( item, i ) => ( {
				value: item?.id,
				label: item?.name,
			} ) );

			setAllTutors( table_data );

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
                                history.push('/admin-app/categories/new');
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
                    params={ { 'category_id': categoryId } }
                    request={
                    
                        async (params= {} ) => {

                            console.log('proform-params');
                            console.log(params);

                            if( params?.category_id == 0 ) {
                                return;
                            }

                            await waitTime(2000);

                            return await request('/api/categories/' + params?.category_id, {
                                method: 'GET',
                            }).then(async (api_response) => {
                                console.log('api_response');
                                console.log(api_response);

                                setImageUrl(api_response?.data?.image_url);

                                return {
                                    ...initialValues,
                                    image_url: api_response?.data?.image_url,
                                    title: api_response?.data?.title,
                                    description: api_response?.data?.description,
                                    tutors: api_response?.data?.tutors?.map( ( tutor ) => ( {
                                        tutor: tutor?.id
                                    } ) ) || [],
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

                        values.category_id = categoryId;
                        values.image_url = imageUrl;
                        
                        await onFinishHandlerForm(values, imageUrl);
                    }}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    }}
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
                                            fallback={('' !== imageUrl || null === imageUrl ? imageUrl : DEFAULT_PLACEHOLDER_IMAGE_URL)}
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
                                        rules={[{ required: true }]}
                                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                    />
                                </ProForm.Group>
                                <ProForm.Group size={24}>
                                    <ProFormTextArea
                                        name={'description'}
                                        label="Description"
                                        fieldProps={ {
                                            rows: 6,
                                        } }
                                        placeholder="Share a little description to fill out your category."
                                        rules={[{ required: true }]}
                                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                    />
                                </ProForm.Group>
                            </Col>
                        </Row>
                    </ProCard>
                    <ProCard
                        title="Assign Tutors"
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
                                name={ 'tutors' }
                                min={ 1 }
                                copyIconProps={ { tooltipText: 'Copy this tutor' } }
                                deleteIconProps={ { tooltipText: 'Delete this tutor' } }
                                creatorButtonProps={ {
                                    creatorButtonText: 'Add New Tutor',
                                } }
                            >
                                <ProForm.Group size={ 24 }>
                                    <ProFormSelect
                                        name={ 'tutor' }
                                        label="Tutor"
                                        showSearch
                                        options={ allTutors }
                                        debounceTime={ 300 }
                                        placeholder="Please Select a Tutor"
                                        rules={ [ { required: true } ] }
                                        colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                                    />
                                </ProForm.Group>
                            </ProFormList>
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

export default UpdateCategory;
