import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {request} from '@umijs/max';

const DeleteTutor = ( { rowId, onFinish } ) => {
	return (
		<Popconfirm
			title="Delete the Tutor"
			description="Are you sure you want to delete this Tutor?"
			icon={ <QuestionCircleOutlined style={ { color: 'red' } } /> }
			placement="left"
			onConfirm={ async () => {
				return await request('/api/users/' + rowId, {

					method: 'DELETE',

				} ).then( ( response ) => {

					if ( response.status === true ) {
						onFinish( {
							status: true,
							text_message: 'Tutor deleted successfully',
						} );
					} else {
						onFinish( {
							status: false,
							text_message:
								'Failed to delete Tutor: Invalid response',
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
export default DeleteTutor;
