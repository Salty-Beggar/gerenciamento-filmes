
import { useState, useEffect, useCallback } from 'react';
import Tab from './tab.tsx';
import useAppContext from '../context.tsx';
import useOpenModal from '../hooks/openModal.ts';

const UserTab = () => {
		  const { fetchConfig, loadingTab } = useAppContext();
	const openModal = useOpenModal();
	const [filmes, setFilmes] = useState<{
		id: number,
		nome: string,
		sinopse: string,
		ano: string,
		categoria: string,
		link: string,
		imagem: string,
	}[]>([]);

	const [filmes, setFilmes] = useState<{
		nome: string,
		sinopse: string,
		ano: string,
		categoria: string,
		usuario: string,
		link: string,
		imagem: string,
	}[]>([]);

	const view = {
		handleStart: useCallback((id: number) => {
			openModal(id);
		}, [openModal])
	};

	useEffect(() => {
			  setFilmes(fetchConfig);
	}, [fetchConfig, loadingTab]);

	return <Tab tabType={2}>
		<div>
			<label>Categoria: </label>
			<select value={body.categoria} onChange={(e) => setBody(prev => ({...prev, categoria: e.target.value}))}>
				<option>Ficção</option>
				<option>Aventura</option>
			</select>
		</div>
		<div>
			<label>Ano: </label>
			<input type='text' value={body.ano} onChange={(e) => setBody(prev => ({...prev, ano: e.target.value}))} />
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
