import { scaleXpx, scaleYpx } from '@utils';
import { Box, Text } from 'native-base';
import styled from 'styled-components/native';

export interface ITextProps {
  fontSize: string;
}

export const InputView = styled.View`
  height: ${scaleYpx(0.4)};
  width: ${scaleXpx(1)};
  align-items: center;
  justify-content: center;
`;

export const InputTitle = styled(Text).attrs(() => ({
  fontSize: '2xl',
  bold: true,
}))<ITextProps>`
  margin-bottom: ${scaleYpx(0.04)};
`;

export const InputTitle2 = styled(Text)`
  font-size: ${scaleXpx(0.08)};
  font-weight: 500;
  margin-bottom: ${scaleYpx(0.04)};
`;

export const InputText = styled(Text)`
  font-size: ${scaleXpx(0.06)};
  font-weight: 400;
  width: 75%;
  text-align: center;
  margin-bottom: ${scaleYpx(0.02)};
`;

export const InputDotWrapper = styled.View`
  height: ${scaleXpx(0.02)};
  width: ${scaleXpx(0.1)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
`;

export const InputDot = styled.TouchableOpacity<{ active?: boolean }>`
  height: ${scaleXpx(0.02)};
  width: ${scaleXpx(0.02)};
  border-radius: ${scaleXpx(0.01)};
  background-color: ${(props) => (props.active ? 'black' : 'grey')};
`;

export const InputDotImage = styled(Box).attrs<{ active?: boolean }>(() => ({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
}))<{ active?: boolean }>`
  height: ${scaleXpx(0.02)};
  width: ${scaleXpx(0.02)};
  border-radius: ${scaleXpx(0.01)};
  background-color: ${(props) => (props.active ? 'black' : 'grey')};
`;
