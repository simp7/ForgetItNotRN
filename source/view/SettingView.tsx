import React, { useEffect } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { StandardListItem, SwitchListItem, TargetRateListItem } from "../component/List";
import { APP_VERSION, BOTTOM_SAFE_HEIGHT } from "../constant";
import { rstDarkMode, rstNotification, rstTargetRate } from "../model/setting";
import notification from "../util/notification";

const Container = styled(View)`
	padding-top: 130px;
	flex: 1;
	align-self: stretch;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
`;

export const SettingView = () => {
	const [rate, setRate] = useRecoilState(rstTargetRate);
	const [dark, setDark] = useRecoilState(rstDarkMode);
	const [notify, setNotify] = useRecoilState(rstNotification);
	useEffect(() => {
		if (notify) {
			notification.register();
			return;
		}
		notification.unregister();
	}, [notify]);

	return (
		<Container>
			<TargetRateListItem rate={rate} setRate={setRate} />
			<SwitchListItem title={'다크 모드'} value={dark} setValue={setDark} />
			<SwitchListItem title={'알림'} value={notify} setValue={setNotify} />
			<StandardListItem title={'버전'} content={APP_VERSION} />
		</Container>
	);
};