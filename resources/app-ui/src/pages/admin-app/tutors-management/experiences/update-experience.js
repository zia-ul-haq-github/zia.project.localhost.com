import { ProCard, ProForm, ProFormText, ProFormDatePicker, ModalForm } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import moment from 'moment';

const UpdateExperience = ( { visible, onVisiblityChange, editModelData, onFinish } ) => {

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
                okText: 'Update',
            }}
            submitter={{
                // Configure the properties of the button
                resetButtonProps: {
                    style: {
                    // Hide the reset button
                    //   display: 'none',
                    },
                },
                submitButtonProps: {
                    style: {
                    // Hide the submit button
                    //   display: 'none',
                    },
                },
            }}
            grid={true}
            preserve={false}
            submitTimeout={2000}
            onFinish={async (values) => {

                /**
                 * Call the API to update the experience
                 */
                const experience_data = {
                    title: values?.title,
                    organization: values?.organization,
                    start_date: moment(new Date(values?.start_date)).format('YYYY-MM-DD'),
                    end_date: moment(new Date(values?.end_date)).format('YYYY-MM-DD'),
                };
            
                /**
                 * API Request
                */
            
                request('/api/experiences/' + editModelData?.id, {
                    method: 'PUT',
                    data: experience_data,
            
                }).then(async (api_response) => {
            
                    /**
                     * Experience Updated then show message and redirect to listing screen
                     */
                    if (api_response?.data?.id > 0) {
                        onFinish( {
							status: true,
							text_message: 'Experience updated successfully',
						} );
						onVisiblityChange( false );
                    } else {
						onFinish( {
							status: false,
							text_message:
								'Failed to update Experience: Invalid response',
						} );
					}
            
                }).catch(function (error) {
                    console.log(error);
                });
                /**
                 * The following return is necessary to auto close the modal
                 */
                return true;
            }}
        >
            <ProCard
                title="Edit Experience"
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
                        name={'title'}
                        label="Job Title"
                        initialValue={editModelData?.title}
                        placeholder="Type Your Job Title"
                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                    />
                    <ProFormText
                        name={'organization'}
                        label="Institution/Organization"
                        initialValue={editModelData?.organization}
                        placeholder="Type Your Institution/Organization"
                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                    />
                </ProForm.Group>
                <ProForm.Group size={24}>
                    <ProFormDatePicker
                        label="Start Date"
                        name={'start_date'}
                        initialValue={editModelData?.start_date}
                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                    />
                    <ProFormDatePicker
                        label="End Date"
                        name={'end_date'}
                        initialValue={editModelData?.end_date}
                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                    />
                </ProForm.Group>
            </ProCard>
        </ModalForm>
	);
};
export default UpdateExperience;
