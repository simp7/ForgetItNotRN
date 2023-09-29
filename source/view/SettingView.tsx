import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { StandardListItem, SwitchListItem, TargetRateListItem } from "../component/List";
import { APP_VERSION, BOTTOM_SAFE_HEIGHT } from "../constant";
import { rstDarkMode, rstNotification, rstTargetRate, rstVolume } from "../model/setting";
import notification from "../util/notification";

const Container = styled(ScrollView)`
	flex: 1;
`;

export const SettingView = () => {
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
			<SwitchListItem title={'다크 모드'} value={dark} setValue={setDark} />
			<SwitchListItem title={'알림'} value={notify} setValue={setNotify} />
			<SwitchListItem title={'소리'} value={volume === 1} setValue={value => setVolume(value ? 1 : 0)} />
			<StandardListItem title={'버전'} content={APP_VERSION} />
		</Container>
	);
};