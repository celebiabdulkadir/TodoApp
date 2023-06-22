import { closeModal } from '../store/modalSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Modal() {
	const dispatch = useDispatch();
	const { todoId } = useSelector((state) => {
		return state.todo;
	});
	const closeHandle = () => {
		dispatch(closeModal());
	};
	const handleDelete = async (id) => {
		await deleteDoc(doc(db, 'Todos', id));
		toast('Deleted', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			type: 'error',
		});
		dispatch(closeModal());
	};
	return (
		<div className='fixed z-10 inset-0 overflow-y-auto'>
			<div className='flex items-middle items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
				</div>

				<div className='inline-block align-bottom bg-white rounded-lg h-fit text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						<div className='sm:flex sm:items-start'>
							<div className='mt-3 text-center sm:mt-0 sm:text-left'>
								<h3
									className='text-lg leading-6 font-medium text-gray-900'
									id='modal-title'
								>
									Are you sure?
								</h3>
								{/* <div className='mt-2'>
									<p className='text-sm text-gray-500'>{message}</p>
								</div> */}
							</div>
						</div>
					</div>
					<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
						<button
							type='button'
							className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
							onClick={() => handleDelete(todoId)}
						>
							Yes
						</button>
						<button
							type='button'
							className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
							onClick={closeHandle}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
