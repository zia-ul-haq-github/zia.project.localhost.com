import {EditOutlined, PlusOutlined, EyeOutlined, SearchOutlined, ArrowRightOutlined, ReadOutlined, BankOutlined, UploadOutlined, MailOutlined} from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProTable,
  ProList,
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import {Button, Avatar, message, Col, Row, Divider, Input, Card, Tooltip, Upload, Image} from 'antd';
import {request,history, FormattedMessage} from '@umijs/max';
import moment from 'moment';
import {useModel} from 'umi';
import {useRef, useState} from "react";

import { truncateText } from "../../../components/Helpers/TextHelpers";

export const waitTimePromise = async (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time = 100) => {
    await waitTimePromise(time);
};

const { Meta } = Card;

const ListTutorsHiring = () => {

    const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');

    console.log('initialState');
    console.log(initialState);

    console.log('loading');
    console.log(loading);

    const [searchKeywords, setSearchKeywords] = useState('');

    const [tutorHiringViewDetailsData, setTutorHiringViewDetailsData] = useState({});
    const [tutorHiringViewDetailsModelOpen, setTutorHiringViewDetailsModelOpen] = useState(false);

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
            title: "Year of Completion",
            dataIndex: 'completion_date',
            key: 'table-column-completion_date',
            hideInForm: true,
            hideInSearch: true,
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
    ];


    return (
        <div>
            <div className="page-banner-wrapper">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="page-banner-content">
                            <h1>Tutor Hiring</h1>
                        </div>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                        <div className="tutors-grid-filters" style={{marginBlockEnd: "20px"}}>
                        <div className="tutor-search-field">
                            <Input
                                size="large"
                                placeholder="Search by Name or Email of Tutors"
                                prefix={<SearchOutlined />}
                                onChange={(e) => {
                                    console.log('test search input');
                                    console.log(e.target.value);
                                    setSearchKeywords(e.target.value);
                                }}
                            />
                        </div>
                        </div>
                    </Col>
                </Row>
            </div>

        <ProList
            pagination={{
                defaultPageSize: 6,
                showSizeChanger: true,
                pageSizeOptions: [6, 9, 10, 20, 50, 100],
                // onChange: (page) => // console.log(page),
            }}
            showActions="hover"
            grid={{ gutter: 16, column: 3 }}
            itemCardProps={{
                prefixCls: "tutors-grid",
            }}
            params={{
                searchInput: searchKeywords
            }}
            request={async (params, sort, filter) => {

                console.log('tutors-hiring - params');
                console.log(params);

                console.log('tutors-hiring - params - sort');
                console.log(sort);

                console.log('tutors-hiring - params - filter');
                console.log(filter);

                /**
                 * Delay the API request
                 */
                await waitTime(2000);

                return await request("/api/users", {
                    params: {
                        // page: params?.current,
                        // per_page: params?.pageSize,
                        // order_by: "id",
                        // order: "desc",
                        sort: {...sort},
                        pagination: {...params},
                        role: 'tutor',
                        search: params?.searchInput
                    },
                }).then(async (api_response) => {
                    return {
                        data: api_response.data.data,
                        total: api_response.data.total,
                        current_page: api_response.data.current_page,
                    };
                }).catch(function (error) {
                        // console.log(error);
                });
            }}
            metas={{
                content: {
                    render: (text, item) => {
                        return (
                            <Card
                                style={{
                                    width: "100%",
                                    height: "630px", // Set a fixed height for all cards
                                }}
                                actions={[
                                    <Tooltip title="Thank you for visiting! Explore the details of this Tutor.">
                                    <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        key="preview"
                                        size={"large"}
                                        onClick={() => {
                                            setTutorHiringViewDetailsData(item);
                                            setTutorHiringViewDetailsModelOpen(true);
                                        }}
                                    >
                                        View Details
                                    </Button>
                                    </Tooltip>,
                                ]}
                                cover={
                                    <img
                                    alt="example"
                                    src={item?.image_url}
                                    style={{ height: "300px" }}
                                    />
                                }
                                >
                                <h2>{item?.name}</h2>
                                
                                <Meta
                                    description={
                                    <>
                                        <p>{ item?.bio_data ? truncateText(item?.bio_data, 18) : ''}</p>
                                        <p>
                                        <MailOutlined /> {item?.email}
                                        </p>
                                        <p>
                                        <ReadOutlined /> {item?.qualifications?.length > 0 ? item.qualifications[0].degree : "-"}
                                        </p>
                                        <p>
                                        <BankOutlined /> {item?.qualifications?.length > 0 ? item.qualifications[0].institute : "-"}
                                        </p>
                                    </>
                                    }
                                />
                            </Card>
                        );
                    },
                },
            }}
        />

        <ModalForm
            open={tutorHiringViewDetailsModelOpen}
            onOpenChange={setTutorHiringViewDetailsModelOpen}
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
            }}
            submitter={{
              // Configure the properties of the button
              resetButtonProps: {
                style: {
                  // Hide the reset button
                  display: 'none',
                },
              },
              submitButtonProps: {
                style: {
                  // Hide the submit button
                  display: 'none',
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


            //   await deleteTutor(tutorDeleteConfirmationData?.id);

              /**
               * The following return is necessary to auto close the modal
               */
              return true;
            }}
          >

                    <ProCard
                        title="BIO Details"
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
                                            src={tutorHiringViewDetailsData?.image_url}
                                            // src={imageUrl}
                                            // fallback={('' !== userProfileImageUrl ? userProfileImageUrl : DEFAULT_USER_PROFILE_IMAGE_URL)}
                                        />
                                    </Col>

                                </ProForm.Group>
                            </Col>
                            <Col span={18}>
                                <ProForm.Group size={24}>
                                    <ProFormText
                                        name={'name'}
                                        label="Name"
                                        initialValue={tutorHiringViewDetailsData?.name}
                                        fieldProps={{
                                            readOnly: true,
                                        }}
                                        placeholder="Type Your Name"
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                    <ProFormText
                                        label="Email"
                                        name={'email'}
                                        initialValue={tutorHiringViewDetailsData?.email}
                                        placeholder="info@example.com etc."
                                        rules={[{ required: true }]}
                                        fieldProps={{
                                            readOnly: true,
                                        }}
                                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                    />
                                </ProForm.Group>
                                <ProForm.Group size={24}>

                                    <ProFormTextArea
                                        name={'biographical_info'}
                                        label="Biographical Info"
                                        initialValue={tutorHiringViewDetailsData?.bio_data}
                                        fieldProps={{
                                            readOnly: true,
                                        }}
                                        placeholder="Share a little biographical information to fill out your profile. This may be shown publicly. "
                                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                                    />
                                </ProForm.Group>
                            </Col>
                        </Row>
                    </ProCard>

                    <ProCard
                            title="Qualification Details"
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
    
                        <ProTable
                            // actionRef={qualificationsTableRef}
                            rowKey="id"
                            search={false}
                            pagination={{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                pageSizeOptions: [10, 20, 50, 100],
                                onChange: (page) => console.log(page),
                            }}
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
                            
                            dataSource={tutorHiringViewDetailsData?.qualifications?.length ? tutorHiringViewDetailsData.qualifications : []}

                            columns={qualificationColumns}
                        />
                            
                    </ProCard>

                    <ProCard
                        title="Experience Details"
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
                        
                        <ProTable
                            // actionRef={experiencesTableRef}
                            rowKey="id"
                            search={false}
                            pagination={{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                pageSizeOptions: [10, 20, 50, 100],
                                onChange: (page) => console.log(page),
                            }}
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
                            
                            dataSource={tutorHiringViewDetailsData?.experiences?.length ? tutorHiringViewDetailsData.experiences : []}
                            
                            columns={experienceColumns}
                        />

                    </ProCard>

        </ModalForm>

    </div>
    );
};

export default ListTutorsHiring;
