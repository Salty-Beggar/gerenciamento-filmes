import { useCallback } from 'react';
import useAppContext from '../context.tsx';

const useShowModal = () => {
	const { setIsModal, setModalID, modalConfig, setModalConfig } = useAppContext();
	const showModal = useCallback(async (id: number) => {
		setIsModal(true);	
		setModalID(id);
		const response = await (await fetch('http://localhost:8000/api/user/filme/'+id.toString(), {
			method: 'POST',
		})).json();
		setModalConfig(response)

	}, [setIsModal, setModalID, setModalConfig]);
	return showModal;
}

export default useShowModal;
