import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {request} from '@umijs/max';

const DeleteCategory = ( { rowId, onFinish } ) => {
	return (
		<Popconfirm
			title="Delete the Category"
			description="Are you sure you want to delete this Category?"
			icon={ <QuestionCircleOutlined style={ { color: 'red' } } /> }
			placement="left"
			onConfirm={ async () => {
				return await request('/api/categories/' + rowId, {

					method: 'DELETE',

				} ).then( ( response ) => {

					if ( response.status === true ) {
						onFinish( {
							status: true,
							text_message: 'Category deleted successfully',
						} );
					} else {
						onFinish( {
							status: false,
							text_message:
								'Failed to delete Category: Invalid response',
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
export default DeleteCategory;
