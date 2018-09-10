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

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title>リマインダー</Title>
          </Body>
          <Right>
            <Button onPress={() => this.props.navigation.navigate("AddReminder")} transparent>
              <Icon name='md-add' />
            </Button>
          </Right>
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
