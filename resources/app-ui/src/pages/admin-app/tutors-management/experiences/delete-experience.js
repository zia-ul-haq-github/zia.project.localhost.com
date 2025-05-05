import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';

const DeleteExperience = ( { rowId, onFinish } ) => {
	return (
		<Popconfirm
			title="Delete the Experience"
			description="Are you sure you want to delete this Experience?"
			icon={ <QuestionCircleOutlined style={ { color: 'red' } } /> }
			placement="left"
			onConfirm={ async () => {
				return await request('/api/experiences/' + rowId, {

					method: 'DELETE',

				} ).then( ( response ) => {

					if ( response.status === true ) {
						onFinish( {
							status: true,
							text_message: 'Experience deleted successfully',
						} );
					} else {
						onFinish( {
							status: false,
							text_message:
								'Failed to delete Experience: Invalid response',
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
export default DeleteExperience;
