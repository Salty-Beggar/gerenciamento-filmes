import { useCallback} from 'react';
import useAppContext from '../context.tsx';
import type { TabType } from '../type.ts';

const useSelectTab = () => {
	const { loadingTab, setLoadingTab, setSelectedTab, body, setFetchConfig } = useAppContext();

	const selectTab = useCallback(async (tabType: TabType) => {
		if (loadingTab) return;
		setSelectedTab(tabType);
		setLoadingTab(true);
		const response = await fetch(tabType === 1 ? 'http://localhost:8000/api/admin/filmes' : 'http://localhost:8000/api/user/filmes', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		setFetchConfig(await response.json());
		setLoadingTab(false);
	}, [loadingTab, setSelectedTab, setLoadingTab, body, setFetchConfig]);
	return selectTab;
}

export default useSelectTab;
