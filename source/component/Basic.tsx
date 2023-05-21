import { Text } from "react-native";
import styled from "styled-components";

export const PlainText = styled(Text) <{ bold?: boolean }>`
		font-size: 17px;
		font-family: ${p => p.bold ? 'NanumGothic-Bold' : 'NanumGothic-Regular'};
`;