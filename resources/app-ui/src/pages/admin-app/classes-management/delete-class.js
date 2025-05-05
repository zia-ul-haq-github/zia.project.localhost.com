import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';

const DeleteClass = ( { rowId, onFinish } ) => {
	return (
		<Popconfirm
			title="Delete the Class"
			description="Are you sure you want to delete this Class?"
			icon={ <QuestionCircleOutlined style={ { color: 'red' } } /> }
			placement="left"
			onConfirm={ async () => {
				return await request('/api/classes/' + rowId, {

					method: 'DELETE',

				} ).then( ( response ) => {

					if ( response.status === true ) {
						onFinish( {
							status: true,
							text_message: 'Class deleted successfully',
						} );
					} else {
						onFinish( {
							status: false,
							text_message:
								'Failed to delete Class: Invalid response',
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
export default DeleteClass;
