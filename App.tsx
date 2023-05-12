import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled, { ThemeProvider } from 'styled-components';

import { DarkTheme, LightTheme } from './source/theme';

const Container = styled(View)`
  flex: 1;
	align-self: stretch;
	align-items: center;
	justify-content: center;
	background-color: black;
`;

const Text13 = styled(Text)`
	font-size: 30px;
	font-weight: bold;
	color: white;
`;

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<NavigationContainer>
			<ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
				<Container>
					<StatusBar
						barStyle={isDarkMode ? 'light-content' : 'dark-content'}
						backgroundColor={backgroundStyle.backgroundColor}
					/>
					<Text13 >{'ok'}</Text13>
				</Container>
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
