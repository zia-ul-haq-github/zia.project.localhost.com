import { ProCard, ProForm, ProFormText, ModalForm, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import { Row, Col, Image } from 'antd';
import { request } from '@umijs/max';

const ViewStudent = ( { visible, onVisiblityChange, viewModelData } ) => {

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
            //   await waitTime(2000);


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
                    title="Address Details"
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
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'street'}
                            label="Street address"
                            initialValue={viewModelData?.address?.street}
                            fieldProps={{
                                readOnly: true,
                            }}
                            placeholder="Please Enter Street Address"
                            rules={[{ required: true }]}
                            colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'country'}
                            label="Country / Region"
                            initialValue={viewModelData?.address?.country}
                            fieldProps={{
                                readOnly: true,
                            }}
                            placeholder="Please Enter Country / Region"
                            rules={[{ required: true }]}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'province'}
                            label="Province"
                            initialValue={viewModelData?.address?.province}
                            fieldProps={{
                                readOnly: true,
                            }}
                            placeholder="Please Enter Province"
                            rules={[{ required: true }]}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                    <ProForm.Group size={24}>
                        <ProFormText
                            name={'city'}
                            label="City"
                            initialValue={viewModelData?.address?.city}
                            fieldProps={{
                                readOnly: true,
                            }}
                            placeholder="Please Enter City"
                            rules={[{ required: true }]}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                        <ProFormText
                            name={'postal_code'}
                            label="Postal Code / ZIP"
                            initialValue={viewModelData?.address?.postal_code}
                            fieldProps={{
                                readOnly: true,
                            }}
                            placeholder="Please Enter Post Code / ZIP"
                            rules={[{ required: true }]}
                            colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                        />
                    </ProForm.Group>
                </ProCard>

        </ModalForm>
	);
};
export default ViewStudent;
