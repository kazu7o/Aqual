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
import { SQLite } from 'expo';

const db = SQLite.openDatabase('aqual.db');

export default class AddReminderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  //リマインダーテーブル作成（初期化）
  /*
  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists reminders (id integer primary key not null, );'
      );
    });
  }
  */
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button onPress={() => this.props.navigation.navigate("Reminder")} transparent>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body style={styles.title}>
            <Title>リマインダー追加</Title>
          </Body>
        </Header>
        <Content>
          <Text>この画面でリマインダー追加</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    height: 54 + Header.currentHeight,
  },
  title: {
    paddingRight: 30,
  },
});
