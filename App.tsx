import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme as NavDark, DefaultTheme as NavLight, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { rstDarkMode } from './source/model/setting';
import { DarkTheme, LightTheme } from './source/model/theme';
import { updateLastOpenedDate } from './source/util/storage';
import { Navigator } from './source/view/Navigator';

const AppUI = () => {
	const isDarkMode = useRecoilValueLoadable(rstDarkMode);
	const theme = isDarkMode.contents ? DarkTheme : LightTheme;
	const navTheme = isDarkMode.contents ? NavLight : NavDark;
	useEffect(() => {
		AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiGet(keys)).then(result => {
			console.log(JSON.stringify(result));
		});
		const update = AppState.addEventListener('change', nextState => {
			if (nextState !== 'active') {
				updateLastOpenedDate();
			}
		});
		return () => update.remove();
	}, []);

	return (
		<NavigationContainer theme={navTheme}>
			<ThemeProvider theme={theme}>
				<Navigator />
				<StatusBar hidden />
			</ThemeProvider>
		</NavigationContainer>
	);
};

const App = () => {
	return (
		<RecoilRoot>
			<AppUI />
		</RecoilRoot>
	);
};

export default App;
