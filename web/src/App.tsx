import { useState, type CSSProperties } from 'react';
import './App.css';
import { AppContext } from './context.tsx';
import type { TabType } from './type.ts';
import AdminTab from './features/admin.tsx';
import UserTab from './features/user.tsx';
import { TabButton } from './features/tab.tsx';

function App() {
	const style: CSSProperties = {
		padding: '10px',
		display: 'flex',
		width: '100vw',
		height: '100%',
		minHeight: '100vh',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		gap: '30px',
	};
	const [ loadingTab, setLoadingTab ] = useState<boolean>(false);
	const [ isModal, setIsModal ] = useState<boolean>(false);
	const [ selectedTab, setSelectedTab ] = useState<TabType>(1);
	const [ modalID, setModalID ] = useState<number>(-1);
	const [ body, setBody ] = useState<Record<string, string>>({
		categoria: '',
		ano: '0000'
	});
	const [ fetchConfig, setFetchConfig ] = useState<Record<string, unknown>>({});

	return (
		<AppContext value={{
			loadingTab,
			setLoadingTab,
			selectedTab,
			setSelectedTab,
			body,
			setBody,
			isModal,
			setIsModal,
			modalID,
			setModalID,
			fetchConfig,
			setFetchConfig,
		}}>
			{isModal && <div className='modal'>
				<div style={{
					backgroundColor: 'white',	
					border: '2px black solid'
				}}>
					Teste modal
				</div>
			</div>}
			<div style={style}>
				<h1>Gerenciamento de Filmes</h1>
				<div>
					<TabButton title='Admin' tabType={1}/>
					<TabButton title='Usuário' tabType={2}/>
				</div>
				<div>
					<AdminTab/>
					<UserTab/>
				</div>
			</div>
		</AppContext>
	);
}

export default App
