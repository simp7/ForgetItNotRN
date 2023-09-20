import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme as NavDark, DefaultTheme as NavLight, NavigationContainer, Theme } from '@react-navigation/native';
import React, { Suspense, useEffect, useState } from 'react';
import { AppState, StatusBar } from 'react-native';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { rstDarkMode } from './source/model/setting';
import { DarkTheme, LightTheme } from './source/model/theme';
import { updateLastOpenedDate } from './source/util/storage';
import { Navigator } from './source/view/Navigator';

interface AppUIProps {
	theme: DefaultTheme;
	navTheme: Theme;
}

const AppUI = (props: AppUIProps) => {
	const { theme, navTheme } = props;

	return (
		<NavigationContainer theme={navTheme}>
			<ThemeProvider theme={theme}>
				<Navigator />
			</ThemeProvider>
		</NavigationContainer>
	);
};

const ThemeLoader = () => {
	const isDarkMode = useRecoilValue(rstDarkMode);
	const [theme, setTheme] = useState<DefaultTheme>(DarkTheme);
	const [navTheme, setNavTheme] = useState<Theme>(NavDark);

	useEffect(() => {
		AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiGet(keys)).then(result => {
			console.log('All Data:\t', JSON.stringify(result));
		});
		const update = AppState.addEventListener('change', nextState => {
			if (nextState !== 'active') {
				console.log('Update last_opened_date');
				updateLastOpenedDate();
			}
		});
		return () => update.remove();
	}, []);

	useEffect(() => {
		setTheme(isDarkMode ? DarkTheme : LightTheme);
		setNavTheme(isDarkMode ? NavDark : NavLight);
	}, [isDarkMode]);

	return (
		<AppUI theme={theme} navTheme={navTheme} />
	);
};

const App = () => {
	return (
		<RecoilRoot>
			<Suspense>
				<ThemeLoader />
				<StatusBar hidden />
			</Suspense>
		</RecoilRoot >
	);
};

export default App;
