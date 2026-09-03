
import { useState, useCallback, useEffect } from 'react';
import Tab from './tab.tsx';
import useAppContext from '../context.tsx';

const AdminTab = () => {
	const { fetchConfig, loadingTab } = useAppContext();
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedID, setEditedID] = useState<string>('');
	const [editedKey, setEditedKey] = useState<number>(-1);
	const [filmeState, setFilmeState] = useState<{
		nome: string,
		sinopse: string,
		ano: string,
		categoria: number,
		link: string,
		usuario: number,
		imagem: File|undefined,	
	}>({
		nome: '',
		sinopse: '',
		ano: '',
		categoria: -1,
		link: '',
		usuario: -1,
		imagem: undefined,
	});
	const [filmes, setFilmes] = useState<{
		nome: string,
		sinopse: string,
		ano: string,
		categoria: string,
		usuario: string,
		link: string,
		imagem: string,
	}[]>([]);
	const [categorias, setCategorias] = useState<{
		option: string,
		key: string,
	}[]>([]);
	const [usuarios, setUsuarios] = useState<{
		option: string,
		key: string,
	}[]>([]);
	// const filmes = [
	// 	{
	// 		nome: 'Shrek 2',
	// 		sinopse: 'O shrek 2 é um filme muito massa.',
	// 		ano: '2023',
	// 		categoria: 'Ficção científica',
	// 		link: 'http://blehhh.com',
	// 		imagem: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.tvtropes.org%2Fpmwiki%2Fpub%2Fimages%2Fultrakill_cover.jpg&f=1&nofb=1&ipt=5f7f79e75656ed7d7a5991a07ccf7ba06b0456c0217c257a4fa69d45df97309a'
	// 	}
	// ];
	
	useEffect(() => {
		fetch('http://localhost:8000/api/categorias', {})
		.then((response) => response.json())
		.then((response) => {
			setCategorias(response);
		});
		fetch('http://localhost:8000/api/usuarios', {})
		.then((response) => response.json())
		.then((response) => {
			setUsuarios(response);
		});
	}, []);

	useEffect(() => {
			  setFilmes(fetchConfig);
			  console.log(fetchConfig);
	}, [fetchConfig, loadingTab]);

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
				  usuario: -1,
			  });
		}, [isCreating, setIsCreating, isEditing]),
		handleCancel: useCallback(() => {
			if (!isCreating) return;
			setIsCreating(false);
		}, [isCreating, setIsCreating]),
		handleConfirm: useCallback(async () => {
			if (!isCreating) return;
			const formData = new FormData();
			if (filmeState.imagem) formData.append('imagem', filmeState.imagem);
			formData.append('titulo', filmeState.nome);
			formData.append('sinopse', filmeState.sinopse);
			formData.append('ano', filmeState.ano);
			formData.append('categoria_id', filmeState.categoria.toString());
			formData.append('usuario_id', filmeState.usuario.toString());
			formData.append('trailer_url', filmeState.link);
			const response = await fetch('http://localhost:8000/api/admin/filme', {
				method: 'POST',
				body: formData
			});
			const novoFilme = await response.json();
			setFilmes(prev => [...prev, novoFilme]);
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
				  usuario: -1,
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
			const formData = new FormData();
			if (filmeState.imagem) formData.append('imagem', filmeState.imagem);
			formData.append('titulo', filmeState.nome);
			formData.append('sinopse', filmeState.sinopse);
			formData.append('ano', filmeState.ano);
			formData.append('categoria_id', filmeState.categoria.toString());
			formData.append('usuario_id', filmeState.usuario.toString());
			formData.append('trailer_url', filmeState.link);
			const response = await fetch('http://localhost:8000/api/admin/filme/'+editedKey, {
				method: 'POST',
				body: formData
			});
			const novoFilme = await response.json();
			setFilmes(prev => prev.map(filme => filme.id === novoFilme.id ? novoFilme : filme));
			setIsEditing(false);
		}, [isEditing, setIsEditing, filmeState, editedKey]),
	};

	useEffect(() => console.log(filmeState), [filmeState]);

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
					Usuário
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
							{categorias.map(categoria => <option key={categoria.key} value={categoria.key}>{categoria.option}</option>)}
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
							<select value={filmeState.usuario} onChange={(e) => {
								setFilmeState(prev => ({...prev, usuario: Number(e.target.value)}))
							}}>
							{usuarios.map(usuario => <option key={usuario.key} value={usuario.key}>{usuario.option}</option>)}
							</select>
						</td>
					</tr>
				) }
				{filmes.map((filme, index) => (!isEditing || filme.id !== editedKey) ? (
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
							{filme.usuario}
						</td>
						<td>
							<button type='button' onClick={() => edit.handleStart(filme.id)}>
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
							{categorias.map(categoria => <option key={categoria.key} value={categoria.key}>{categoria.option}</option>)}
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
							<select value={filmeState.usuario} onChange={(e) => {
								setFilmeState(prev => ({...prev, usuario: Number(e.target.value)}))
							}}>
							{usuarios.map(categoria => <option key={categoria.key} value={categoria.key}>{categoria.option}</option>)}
							</select>
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
