import React from 'react';
import {
  StyleSheet,
  RefreshControl,
 } from 'react-native';
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
  Icon,
  Switch,
} from 'native-base';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('aqual.db');

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      switching: false,
      refreshing: false,
      reminders: null,
    };
  }

  switchValue = (value) => {
    this.setState({ switching: value});
    {/*
    const switchText = value ? 'ON' : 'OFF';
    alert(`今の状態はスイッチ${switchText}です`);
    */}
  }

  componentWillMount(){
    db.transaction(
      tx => {
        tx.executeSql("select * from reminders", [], (_, { rows }) => this.setState({reminders: rows}));
      },
    );
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    db.transaction(
      tx => {
        tx.executeSql("select * from reminders", [], (_, { rows }) => this.setState({reminders: rows}));
      },
    );
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  }
  delCard(id) {
    db.transaction(
      tx => {
        tx.executeSql("delete from reminders where id = ?", [id]);
      },
    );
    this._onRefresh();
  }
  render() {
    var Cards = [];
    if(this.state.reminders != null){
      var reminders = this.state.reminders['_array'];
      Cards = reminders.map(reminderInfo => (
        <Card style={{flex: 0}} key={reminderInfo.id}>
          <CardItem bordered>
            <Left>
              <Body>
                <Text>{reminderInfo.title}</Text>
                <Text note>{reminderInfo.date}</Text>
              </Body>
            </Left>
            <Right>
              <Switch onValueChange={this.switchValue} value={this.state.switching}/>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Button onPress={() => this.delCard(reminderInfo.id)} transparent>
                <Icon name='md-trash' />
              </Button>
            </Body>
          </CardItem>
        </Card>
      ));
      {/*
      for(var i = 0; i < reminders['length']; i++){
        Cards.push(
          <Card style={{flex: 0}} key={i}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{reminders['_array'][i]['title']}</Text>
                  <Text note>{reminders['_array'][i]['date']}</Text>
                </Body>
              </Left>
              <Right>
                <Switch onValueChange={this.switchValue} value={this.state.switching}/>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Button transparent>
                  <Icon name='md-trash' />
                </Button>
              </Body>
            </CardItem>
          </Card>
        );
      }
      */}
    }

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
        <Content
          refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={()=>{this._onRefresh()}}/>
        }>
          {Cards}
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
