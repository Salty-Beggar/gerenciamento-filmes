import { useCallback } from 'react';
import useAppContext from '../context.tsx';

const useShowModal = () => {
	const { setIsModal, setModalID } = useAppContext();
	const showModal = useCallback((id: number) => {
		setIsModal(true);	
		setModalID(id);
	}, [setIsModal, setModalID]);
	return showModal;
}

export default useShowModal;
