import { ProCard, ProForm, ProFormText, ModalForm, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import { Row, Col, Image } from 'antd';
import { request } from '@umijs/max';

const ViewTutorHiring = ( { visible, onVisiblityChange, viewModelData, waitTime } ) => {

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
		<ModalForm
            open={ visible }
            onOpenChange={ ( isVisible ) => {
                if ( ! isVisible ) {
                    onVisiblityChange( isVisible );
                }
            } }
            modalProps={{
              destroyOnClose: true,
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
               * Call the APIs to update the 
               */


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
                                        src={viewModelData?.image_url}
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
                                    initialValue={viewModelData?.name}
                                    fieldProps={{
                                        readOnly: true,
                                    }}
                                    placeholder="Type Your Name"
                                    colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                                />
                                <ProFormText
                                    label="Email"
                                    name={'email'}
                                    initialValue={viewModelData?.email}
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
                                    initialValue={viewModelData?.bio_data}
                                    fieldProps={{
                                        rows: 6,
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
                                /**
                                 * Delay the API request
                                 */
                                await waitTime(2000);
                            }
                        }
                        dataSource={viewModelData?.qualifications?.length ? viewModelData.qualifications : []}
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
                                /**
                                 * Delay the API request
                                 */
                                await waitTime(2000);
                            }
                        }
                        dataSource={viewModelData?.experiences?.length ? viewModelData.experiences : []}
                        columns={experienceColumns}
                    />
                </ProCard>

        </ModalForm>
	);
};
export default ViewTutorHiring;
