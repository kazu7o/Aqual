import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon
} from 'native-base';

export default class CalcScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title>ツール</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    height: 54 + Header.currentHeight,
  },
});
