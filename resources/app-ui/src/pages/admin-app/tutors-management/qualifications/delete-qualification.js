import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {request} from '@umijs/max';

const DeleteQualification = ( { rowId, onFinish } ) => {
	return (
		<Popconfirm
			title="Delete the Qualification"
			description="Are you sure you want to delete this Qualification?"
			icon={ <QuestionCircleOutlined style={ { color: 'red' } } /> }
			placement="left"
			onConfirm={ async () => {
				return await request('/api/qualifications/' + rowId, {

					method: 'DELETE',

				} ).then( ( response ) => {

					if ( response.status === true ) {
						onFinish( {
							status: true,
							text_message: 'Qualification deleted successfully',
						} );
					} else {
						onFinish( {
							status: false,
							text_message:
								'Failed to delete Qualification: Invalid response',
						} );
					}
				} );
			} }
			okText="Yes"
			cancelText="No"
		>
			<Button key="deletable" danger={ true }>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	);
};
export default DeleteQualification;
