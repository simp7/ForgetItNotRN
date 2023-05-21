import { Text } from "react-native";
import styled from "styled-components";

export const PlainText = styled(Text) <{ bold?: boolean, size?: number }>`
		font-size: ${p => p.size ?? 17}px;
		font-family: 'NanumGothic';
		font-weight: ${p => p.bold ? 'bold' : 'normal'};
`;