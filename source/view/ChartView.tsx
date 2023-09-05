import React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { SpacerHeight } from "../component/Basic";
import { StandardListItem } from "../component/List";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { rstPeriod } from "../model/period";
import { rstStat } from "../model/stat";

const Container = styled(View)`
	padding-top: 130px;
	flex: 1;
	align-self: stretch;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
`;

export const ChartView = () => {
	const period = useRecoilValue(rstPeriod);
	const status = useRecoilValue(rstStat);

	return (
		<Container>
			<StandardListItem title={'현재 성취율'} content={`${status?.currentStreak ?? 0}%`} />
			<SpacerHeight size={20} />
			<StandardListItem title={'현재 연속 기록'} content={`${status?.currentStreak}일`} />
			<SpacerHeight size={20} />
			<StandardListItem title={'최장 연속 기록'} content={`${status?.maxStreak}일`} />
			<SpacerHeight size={20} />
			<StandardListItem title={'주기(일)'} content={period.join(', ')} />
		</Container>
	);
};