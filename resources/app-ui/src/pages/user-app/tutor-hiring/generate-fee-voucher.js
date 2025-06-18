import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, FileProtectOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import moment from 'moment';
import { useEffect, useState } from "react";

const GenerateFeeVoucher = ( { rowId, onFinish, userData, categoryId, tutorData, feeAmount, serviceCharges } ) => {

	const [ categoryTitle, setCategoryTitle ] = useState( [] );

	/**
     * Start - Category Title
     */
    useEffect( () => {
        return request('/api/categories/' + categoryId, {
			method: 'GET',
        }).then( ( api_response ) => {
        
            setCategoryTitle( api_response?.data?.title );

            console.log('api_response');
            console.log(api_response);
        
        } );
    }, [] );

	return (
		<Popconfirm
			title="Generate the Fee Voucher"
			description="Are you sure you want to generate this Fee Voucher?"
			icon={ <QuestionCircleOutlined style={ { color: 'red' } } /> }
			placement="left"
			onConfirm={ async () => {

				const request_data = {
					title: 'Fee Voucher - user:' + userData?.name + ' - Category:' + categoryTitle + ' - Tutor:' + tutorData?.name,
					description: 'This Fee Voucher is generated for user:' + userData?.name + ' regarding enrollment into the Category:' + categoryTitle + ' with Tutor:' + tutorData?.name + '.',
					amount: feeAmount + serviceCharges,
					due_date: moment().add(30, 'days').format('YYYY-MM-DD'),
					status: 'unpaid',
					payment_proof_image_url: '',
					verification_status: 'pending',
					category_id: categoryId,
					tutor_id: tutorData?.id,
					fee_package_id: rowId,
					user_id: userData?.id,
					author_id: userData?.id,
				};

				console.log('request_data');
				console.log(request_data);

				return await request('/api/fee-vouchers', {

					method: 'POST',
            		data: request_data,

				} ).then( ( response ) => {

					if ( response.status === true ) {
						onFinish( {
							status: true,
							text_message: 'Fee Voucher generated successfully',
						} );
					} else {
						onFinish( {
							status: false,
							text_message:
								'Failed to generate Fee Voucher: Invalid response',
						} );
					}
				} );
			} }
			okText="Yes"
			cancelText="No"
		>
			<Button key="generate_fee_voucher">
				<FileProtectOutlined /> Generate Fee Voucher
			</Button>
		</Popconfirm>
	);
};
export default GenerateFeeVoucher;
