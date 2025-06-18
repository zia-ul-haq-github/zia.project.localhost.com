import { useState } from "react";
import { Form } from 'antd';
import { ProCard, ProForm, ProFormText, ProFormList, ProFormSelect, ModalForm } from '@ant-design/pro-components';
import {request} from '@umijs/max';
import moment from 'moment';

const UpdateQuestion = ( { visible, onVisiblityChange, editModelData, onFinish } ) => {

    const [formref] = Form.useForm();

    const [ questionsChoices, setQuestionsChoices ] = useState([]);

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
            onFieldsChange={ async ( changedFields, allFields) => {
                // console.log('changedFields = ', changedFields);
                // console.log('allFields = ', allFields);

                console.log('changedFieldName = ', changedFields[0].name);

                if(changedFields && changedFields[0].name.includes('choices') ){
                    const choices = formref.getFieldValue('choices');
                    console.log('choices', choices);

                    setQuestionsChoices(choices);
                    
                }

            }}
            preserve={false}
            submitTimeout={2000}
            onFinish={async (values) => {

                /**
                 * Call the APIs to update the question
                 */
                const question_data = {
                    quiz_id: quizID,
                    author_id: authorID,
                    title: values?.title,
                    choices: values?.choices,
                    answer: values?.answer,
                };
            
                /**
                 * API Request
                */
            
                request('/api/questions/' + editModelData?.id, {
                    method: 'PUT',
                    data: question_data,
            
                }).then(async (api_response) => {
            
                    /**
                     * Question Updated then show message and redirect to listing screen
                     */
                    if (api_response?.data?.id > 0) {
                        onFinish( {
							status: true,
							text_message: 'Question updated successfully',
						} );
						onVisiblityChange( false );
                    } else {
						onFinish( {
							status: false,
							text_message:
								'Failed to update Question: Invalid response',
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
                title="Edit Question"
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
                        label="Title"
                        initialValue={editModelData?.title}
                        placeholder="Type Question Title"
                        rules={ [ { required: true } ] }
                        colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                    />
                </ProForm.Group>
                <ProForm.Group size={24}>
                    <ProFormList
                        name={ 'choices' }
                        min={ 1 }
                        max={ 4 }
                        initialValue={editModelData?.choices}
                        copyIconProps={ { tooltipText: 'Copy this choice' } }
                        deleteIconProps={ { tooltipText: 'Delete this choice' } }
                        creatorButtonProps={ {
                            creatorButtonText: 'Add New Choice',
                        } }
                    >
                        <ProForm.Group size={ 24 }>
                            <ProFormText
                                name={'choice'}
                                label="Choice"
                                placeholder="Type Your Choice"
                                rules={ [ { required: true } ] }
                                colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
                            />
                        </ProForm.Group>
                        
                    </ProFormList>
                </ProForm.Group>
                <ProForm.Group size={ 24 }>
                    <ProFormSelect
                        name={ 'answer' }
                        label="Answer"
                        initialValue={editModelData?.answer}
                        showSearch={true}
                        params={{
                            selected_choices: questionsChoices
                        }}
                        request={ async ( params ) => {

                            // console.log('params = ', params);

                            const options = params?.selected_choices.map((selected_choice, index) => {
                                return {
                                    label: selected_choice?.choice,
                                    value: ((selected_choice?.choice).trim()).replace(/\s+/g, '-').toLowerCase()
                                };
                            });

                            console.log('options', options);

                            return options;
                            
                        }}
                        debounceTime={ 300 }
                        placeholder="Please Select a Answer"
                        rules={ [ { required: true } ] }
                        colProps={ { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }
                    />
                </ProForm.Group>
            </ProCard>
        </ModalForm>
	);
};
export default UpdateQuestion;
