
import { useState, useCallback } from 'react';
import Tab from './tab.tsx';
import useAppContext from '../context.tsx';

const AdminTab = () => {
	const { fetchConfig, setFetchConfig } = useAppContext();
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedKey, setEditedKey] = useState<number>(-1);
	const [filmeState, setFilmeState] = useState<{
		nome: string,
		sinopse: string,
		ano: string,
		categoria: number,
		link: string,
		imagem: File|undefined,	
	}>({
		nome: '',
		sinopse: '',
		ano: '',
		categoria: -1,
		link: '',
		imagem: undefined,
	});
	// const [filmes, setFetchConfig] = useState<{
	// 	id: number,
	// 	nome: string,
	// 	sinopse: string,
	// 	ano: string,
	// 	categoria: string,
	// 	link: string,
	// 	imagem: string,
	// }[]>([]);

	const create = {
		handleStart: useCallback(() => {
			if (isEditing) return;
			if (isCreating) return;
			setIsCreating(true);
			setFilmeState({
				  nome: '',
				  sinopse: '',
				  ano: '',
				  categoria: -1,
				  link: '',
				  imagem: undefined,
			  });
		}, [isCreating, setIsCreating, isEditing]),
		handleCancel: useCallback(() => {
			if (!isCreating) return;
			setIsCreating(false);
		}, [isCreating, setIsCreating]),
		handleConfirm: useCallback(async () => {
			if (!isCreating) return;

			const formData = new FormData();
			formData.append('files', filmeState.imagem);
			formData.append('titulo', filmeState.nome);
			formData.append('sinopse', filmeState.sinopse);
			formData.append('ano', filmeState.ano);
			formData.append('categoria_id', filmeState.categoria.toString());
			formData.append('trailer_url', filmeState.link);
			const response = await fetch('http://localhost:8000/api/admin/filme', {
				method: 'POST',
				body: formData,
			});
			const novoFilme = await response.json();
			setFetchConfig(prev => [...prev, novoFilme]);
			setIsCreating(false);
		}, [isCreating, filmeState.imagem, filmeState.nome, filmeState.sinopse, filmeState.ano, filmeState.categoria, filmeState.link, setFetchConfig]),
	};

	const edit = {
		handleStart: useCallback((key: number) => {
			if (isEditing) return;
			setIsEditing(true);
			setEditedKey(key);
			setFilmeState({
				  nome: '',
				  sinopse: '',
				  ano: '',
				  categoria: -1,
				  link: '',
				  imagem: undefined,
			  });
		}, [isEditing, setIsEditing]),
		handleCancel: useCallback(() => {
			if (!isEditing) return;
			setIsEditing(false);
		}, [isEditing, setIsEditing]),
		handleConfirm: useCallback(async () => {
			if (!isEditing) return;
			console.log(filmeState);

			const formData = new FormData();
			// formData.append('files', filmeState.imagem);
			formData.append('titulo', filmeState.nome);
			formData.append('sinopse', filmeState.sinopse);
			formData.append('ano', filmeState.ano);
			formData.append('categoria_id', filmeState.categoria.toString());
			formData.append('trailer_url', filmeState.link);
			const response = await fetch('http://localhost:8000/api/admin/filme', {
				method: 'POST',
				body: formData,
			});
			const novoFilme = await response.json();
			setFetchConfig(prev => prev.map(filme => filme.id === novoFilme.id ? novoFilme : filme));
			setIsEditing(false);
		}, [isEditing, filmeState, setFetchConfig]),
	};

	return <Tab tabType={1}>
		<div>
		{
			isCreating 
				? <>
					<button type='button' onClick={create.handleCancel}>Cancelar</button>
					<button type='button' onClick={create.handleConfirm}>Confirmar</button>
				</>
				: <button type='button' onClick={create.handleStart}>Criar</button>
		}
		</div>
		<table>
			<thead>
				<td>
					Nome
				</td>
				<td>
					Sinopse
				</td>	
				<td>
					Ano
				</td>	
				<td>
					Categoria
				</td>	
				<td>
					Link do trailer
				</td>	
				<td>
					Imagem
				</td>	
				<td>
					Editar
				</td>
			</thead>	
			<tbody>
				{ isCreating && (	
					<tr>
						<td>
							<input type='text' value={filmeState.nome} onChange={(e) => {
								setFilmeState(prev => ({...prev, nome: e.target.value}))
							}}/>
						</td>
						<td>
							<input type='text' value={filmeState.sinopse} onChange={(e) => {
								setFilmeState(prev => ({...prev, sinopse: e.target.value}))
							}}/>
						</td>
						<td>
							<input type='text' value={filmeState.ano} onChange={(e) => {
								setFilmeState(prev => ({...prev, ano: e.target.value}))
							}}/>
						</td>
						<td>
							<select value={filmeState.categoria} onChange={(e) => {
								setFilmeState(prev => ({...prev, categoria: Number(e.target.value)}))
							}}>
								<option value={1}>Hello</option>
								<option value={2}>Hcccello</option>
							</select>
						</td>
						<td>
							<input type='text' value={filmeState.link} onChange={(e) => {
								setFilmeState(prev => ({...prev, link: e.target.value}))
							}}/>
						</td>
						<td>
							<input type='file' onChange={(e) => {
								setFilmeState(prev => ({...prev, imagem: e.target.files?.[0]}));
							}} />
						</td>
					</tr>
				) }
				{fetchConfig.map((filme, index) => (!isEditing || index !== editedKey) ? (
					<tr key={index}>
						<td>
							{filme.nome}
						</td>
						<td>
							{filme.sinopse}
						</td>
						<td>
							{filme.ano}
						</td>
						<td>
							{filme.categoria}
						</td>
						<td>
							<a href={filme.link}>
								{filme.link}
							</a>
						</td>
						<td>
							<img style={{ height: '100px' }} src={filme.imagem}/>
						</td>
						<td>
							<button type='button' onClick={() => edit.handleStart(index)}>
								X
							</button>
				 		</td>
					</tr>
				) : (	
					<tr>
						<td>
							<input type='text' value={filmeState.nome} onChange={(e) => {
								setFilmeState(prev => ({...prev, nome: e.target.value}))
							}}/>
						</td>
						<td>
							<input type='text' value={filmeState.sinopse} onChange={(e) => {
								setFilmeState(prev => ({...prev, sinopse: e.target.value}))
							}}/>
						</td>
						<td>
							<input type='text' value={filmeState.ano} onChange={(e) => {
								setFilmeState(prev => ({...prev, ano: e.target.value}))
							}}/>
						</td>
						<td>
							<select value={filmeState.categoria} onChange={(e) => {
								setFilmeState(prev => ({...prev, categoria: Number(e.target.value)}))
							}}>
								<option value={1}>Hello</option>
								<option value={2}>Hcccello</option>
							</select>
						</td>
						<td>
							<input type='text' value={filmeState.link} onChange={(e) => {
								setFilmeState(prev => ({...prev, link: e.target.value}))
							}}/>
						</td>
						<td>
							<input type='file' onChange={(e) => {
								setFilmeState(prev => ({...prev, imagem: e.target.files?.[0]}));
							}} />
						</td>
						<td>
							<button type='button' onClick={() => edit.handleConfirm()}>
								Confirmar
							</button>
				 		</td>
					</tr>
				))}
			</tbody>
		</table>
	</Tab>	
}

export default AdminTab
