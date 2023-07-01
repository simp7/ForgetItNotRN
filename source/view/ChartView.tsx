import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { SpacerHeight } from "../component/Basic";
import { StandardListItem } from "../component/List";
import { BOTTOM_SAFE_HEIGHT } from "../constant";

const Container = styled(View)`
	padding-top: 130px;
	flex: 1;
	align-self: stretch;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
`;

export const ChartView = () => {
	return (
		<Container>
			<StandardListItem title={'현재 성취율'} content={'1.0.0'} />
			<SpacerHeight size={20} />
			<StandardListItem title={'현재 연속 기록'} content={'1.0.0'} />
			<SpacerHeight size={20} />
			<StandardListItem title={'최장 연속 기록'} content={'1.0.0'} />
			<SpacerHeight size={20} />
			<StandardListItem title={'주기'} content={'1.0.0'} />
		</Container>
	);
};