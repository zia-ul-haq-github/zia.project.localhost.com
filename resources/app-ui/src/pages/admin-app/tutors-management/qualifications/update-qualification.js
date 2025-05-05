import { ProCard, ProForm, ProFormText, ProFormDatePicker, ModalForm } from '@ant-design/pro-components';
import {request} from '@umijs/max';
import moment from 'moment';

const UpdateQualification = ( { visible, onVisiblityChange, editModelData, onFinish } ) => {

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
                 * Call the APIs to update the qualification
                 */
                const qualification_data = {
                    institute: values?.institute,
                    degree: values?.degree,
                    board: values?.board,
                    grade: values?.grade,
                    completion_date: moment(new Date(values?.year_of_completion)).format('YYYY'),
                };
            
                /**
                 * API Request
                */
            
                request('/api/qualifications/' + editModelData?.id, {
                    method: 'PUT',
                    data: qualification_data,
            
                }).then(async (api_response) => {
            
                    /**
                     * Qualification Updated then show message and redirect to listing screen
                     */
                    if (api_response?.data?.id > 0) {
                        onFinish( {
							status: true,
							text_message: 'Qualification updated successfully',
						} );
						onVisiblityChange( false );
                    } else {
						onFinish( {
							status: false,
							text_message:
								'Failed to update Qualification: Invalid response',
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
                title="Edit Qualification"
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
                        name={'institute'}
                        label="University/Institution"
                        initialValue={editModelData?.institute}
                        placeholder="Type Your University/Institution Name"
                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                    />
                    <ProFormText
                        name={'degree'}
                        label="Degree"
                        initialValue={editModelData?.degree}
                        placeholder="Type Your Degree"
                        colProps={{xs: 24, sm: 24, md: 12, lg: 12, xl: 12}}
                    />
                </ProForm.Group>
                <ProForm.Group size={24}>
                    <ProFormText
                        name={'board'}
                        label="Board"
                        initialValue={editModelData?.board}
                        placeholder="Type Your Board Name"
                        colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                    />
                    <ProFormText
                        name={'grade'}
                        label="Grade"
                        initialValue={editModelData?.grade}
                        placeholder="Type Your Grade"
                        colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                    />
                    <ProFormDatePicker
                        label="Year of Completion"
                        name={'year_of_completion'}
                        placeholder="Select Year"
                        initialValue={editModelData?.completion_date}
                        fieldProps={{
                            picker: 'year',
                            format: 'YYYY'
                        }}
                        colProps={{xs: 24, sm: 24, md: 8, lg: 8, xl: 8}}
                    />
                </ProForm.Group>
            </ProCard>
        </ModalForm>
	);
};
export default UpdateQualification;
