
import { useState, useCallback } from 'react';
import Tab from './tab.tsx';
import useAppContext from '../context.tsx';
import useOpenModal from '../hooks/openModal.ts';

const UserTab = () => {
	const openModal = useOpenModal();

	const view = {
		handleStart: useCallback((id: number) => {
			openModal(id);
		}, [openModal])
	};

	const filmes = [
		{
			id: 5,
			nome: 'Shrek 2',
			sinopse: 'O shrek 2 é um filme muito massa.',
			ano: '2023',
			categoria: 'Ficção científica',
			link: 'http://blehhh.com',
			imagem: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.tvtropes.org%2Fpmwiki%2Fpub%2Fimages%2Fultrakill_cover.jpg&f=1&nofb=1&ipt=5f7f79e75656ed7d7a5991a07ccf7ba06b0456c0217c257a4fa69d45df97309a'
		}
	];
	return <Tab tabType={2}>
		<div>
			<label>Categoria: </label>
			<select>
				<option>Ficção</option>
				<option>Aventura</option>
			</select>
		</div>
		<div>
			<label>Ano: </label>
			<input type='text' />
		</div>
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '20px',
		}}>
		{filmes.map((filme, index) => (
			<div key={index} onClick={() => view.handleStart(filme.id)}>
				<img style={{ width: '200px', height: '200px'}} src={filme.imagem}/>
				<br/>
				{filme.nome}
			</div>
		))}
		</div>
	</Tab>	
}

export default UserTab
