import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styled, { useTheme } from "styled-components";

import { IconAdd, IconTrash } from "../asset/icon";
import { BasicButton, SpacerHeight } from "../component/Basic";
import { Tag } from "../component/List";
import { BOTTOM_SAFE_HEIGHT } from "../constant";

const Container = styled(View)`
	flex:1;
`;

const TagContainer = styled(ScrollView)`
	flex: 1;
`;

const DeleteButtonContainer = styled(BasicButton)`
	margin: 0 30px;
`;

export const TagView = () => {
	const tags: string[] = [];
	const { colors } = useTheme();
	const [selected, setSelected] = useState('');

	const deleteTag = (tag: string) => {

	};

	const addTag = (tag: string) => {

	};

	return (
		<Container>
			<TagContainer
				showsVerticalScrollIndicator={false}
				bounces={false}
				contentContainerStyle={{
					paddingTop: 130,
					alignSelf: 'stretch',
					flexWrap: 'wrap',
					flexDirection: 'row',
				}}
			>
				{tags.map(tag => <Tag tag={tag} key={tag} />)}
				<BasicButton>
					<IconAdd size={30} />
				</BasicButton>
			</TagContainer>
			<SpacerHeight size={20} />
			<DeleteButtonContainer disabled={!selected} onPress={() => deleteTag(selected)}>
				<IconTrash tint={selected ? colors.grapefruit : colors.gray} />
			</DeleteButtonContainer>
			<SpacerHeight size={BOTTOM_SAFE_HEIGHT + 40} />
		</Container>
	);
};