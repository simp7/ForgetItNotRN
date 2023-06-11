import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { rstDarkMode } from './source/model/setting';
import { DarkTheme, LightTheme } from './source/model/theme';
import { now } from './source/util/date';
import { loadLastOpenedDate } from './source/util/storage';
import { Navigator } from './source/view/Navigator';

const initialize = async () => {
	const date = await loadLastOpenedDate();
	if (date === "") {
		return;
	}
	if (date !== now()) {
		return;
	}
};

const AppUI = () => {
	const isDarkMode = useRecoilValueLoadable(rstDarkMode);
	const theme = isDarkMode.contents ? DarkTheme : LightTheme;

	return (
		<ThemeProvider theme={theme}>
			<Navigator />
			<StatusBar hidden />
		</ThemeProvider>
	);
};

const App = () => {
	return (
		<RecoilRoot>
			<NavigationContainer>
				<AppUI />
			</NavigationContainer>
		</RecoilRoot>
	);
};

export default App;
