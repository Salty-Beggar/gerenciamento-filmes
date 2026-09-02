
import useAppContext from '../context.tsx';
import type { TabType } from '../type.ts';
import useSelectTab from '../hooks/selectTab.ts';

const Tab = ({ children, tabType }: { children: React.ReactNode, tabType: TabType }): React.ReactNode => {
	const { selectedTab } = useAppContext();
	
	return selectedTab === tabType && children;
}

export const TabButton = ({ title, tabType }: {title: string, tabType: TabType }): React.ReactNode => {
	const selectTab = useSelectTab();
	return <button type='button' onClick={() => selectTab(tabType)}>
		{title}
	</button>
}

export default Tab;
