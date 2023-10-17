import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { useTheme } from "styled-components";

import { IconAdd, IconTrash } from "../asset/icon";
import { BasicButton, SpacerHeight } from "../component/Basic";
import { Tag, TagInput } from "../component/List";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { rstAddTag, rstDeleteTag, rstTags } from "../model/tag";

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
	const tags = useRecoilValue(rstTags);
	const { colors } = useTheme();
	const [selected, setSelected] = useState('');
	const addTag = useSetRecoilState(rstAddTag);
	const deleteTag = useSetRecoilState(rstDeleteTag);

	const [text, setText] = useState<string>('');
	const [isAdd, setIsAdd] = useState<boolean>(false);

	const ref = useRef<TextInput>(null);

	const deleteAction = (tag: string) => {
		deleteTag(tag);
		setSelected('');
	};

	const addAction = (tag: string) => {
		if (!!tag) {
			addTag(tag);
		}
		setIsAdd(false);
		setText('');
	};

	const onTagPressed = (tag: string) => {
		setSelected(selected === tag ? '' : tag);
	};

	useEffect(() => {
		if (isAdd) {
			ref.current?.focus();
		}
	}, [isAdd, ref]);

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
					backgroundColor: 'navy',
					paddingHorizontal: 30,
				}}
			>
				{tags.map(tag => (
					<BasicButton onPress={() => onTagPressed(tag)} key={tag}>
						<Tag tag={tag} selected={selected === tag} />
					</BasicButton>
				))}
				{isAdd && (
					<TagInput ref={ref} onChangeText={setText} onEndEditing={() => addAction(text)} />
				)}
				<BasicButton onPress={() => setIsAdd(true)} style={{ margin: 7.5 }}>
					<IconAdd size={30} />
				</BasicButton>
			</TagContainer>
			<SpacerHeight size={20} />
			<DeleteButtonContainer disabled={!selected} onPress={() => deleteAction(selected)}>
				<IconTrash tint={selected ? colors.grapefruit : colors.gray} size={60} />
			</DeleteButtonContainer>
			<SpacerHeight size={BOTTOM_SAFE_HEIGHT + 40} />
		</Container>
	);
};