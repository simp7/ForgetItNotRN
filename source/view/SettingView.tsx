import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { StandardListItem, SwitchListItem, TargetRateListItem } from "../component/List";
import { APP_VERSION, BOTTOM_SAFE_HEIGHT } from "../constant";
import { rstDarkMode, rstNotification, rstTargetRate, rstVolume } from "../model/setting";
import notification from "../util/notification";
import { ParamList, Route } from "./Navigator";

const Container = styled(ScrollView)`
	flex: 1;
`;

type NavProps = StackScreenProps<ParamList, Route.Setting>;

export const SettingView = (props: NavProps) => {
	const { navigation } = props;

	const [rate, setRate] = useRecoilState(rstTargetRate);
	const [dark, setDark] = useRecoilState(rstDarkMode);
	const [notify, setNotify] = useRecoilState(rstNotification);
	const [volume, setVolume] = useRecoilState(rstVolume);

	useEffect(() => {
		if (notify) {
			notification.register();
			return;
		}
		notification.unregister();
	}, [notify]);

	return (
		<Container
			showsVerticalScrollIndicator={false}
			bounces={false}
			contentContainerStyle={{
				paddingTop: 130,
				alignSelf: 'stretch',
				alignItems: 'center',
				paddingBottom: BOTTOM_SAFE_HEIGHT,
			}}
		>
			<TargetRateListItem rate={rate} setRate={setRate} />
			{/* <StandardListItem title={'태그'} onPress={() => navigation.navigate(Route.Tag)} /> */}
			<SwitchListItem title={'다크 모드'} value={dark} setValue={setDark} />
			<SwitchListItem title={'효과음'} value={volume === 1} setValue={value => setVolume(value ? 1 : 0)} />
			<SwitchListItem title={'알림'} value={notify} setValue={setNotify} />
			<StandardListItem title={'버전'} content={APP_VERSION} />
		</Container>
	);
};