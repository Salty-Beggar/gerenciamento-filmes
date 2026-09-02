
import { useContext, createContext } from 'react';
import type { TabType } from './type.ts';

export const AppContext = createContext<{
	loadingTab: boolean,
	setLoadingTab: React.Dispatch<React.SetStateAction<boolean>>,
	selectedTab: TabType,
	setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>,
	body: Record<string, number>,
	setBody: React.Dispatch<React.SetStateAction<Record<string, number>>>,
	isModal: boolean,
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
	modalID: number,
	setModalID: React.Dispatch<React.SetStateAction<number>>,
	fetchConfig: Record<string, unknown>,
	setFetchConfig: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
} | null>(null);

const useAppContext = () => {
	const value = useContext(AppContext);

	if (value === null) {
		throw new Error('Context usado indevidamente');
	}

	return value;
}

export default useAppContext;

