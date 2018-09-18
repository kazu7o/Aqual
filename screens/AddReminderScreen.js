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
  Icon,
  Form,
  Label,
  Item,
  Input,
  DatePicker,
} from 'native-base';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('aqual.db');

export default class AddReminderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      chosenDate: new Date(),
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate
    });
  }
  //リマインダーテーブル作成（初期化）
  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists reminders (id integer primary key not null, title text, date text);'
      );
    });
  }
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button onPress={() => this.props.navigation.navigate("Reminder")} transparent>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>新規追加</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text style={styles.h1}>リマインダー追加</Text>
          <Form>
            <Item stackedLabel>
              <Label>内容</Label>
              <Input onChangeText={(text) => {this.setState({title: text}); }}/>
            </Item>
            <Item stackedLabel>
              <Label>日付</Label>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(1990, 1, 1)}
                maximumDate={new Date(2038, 12, 31)}
                locale={"ja"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                //placeHolderText="開始日を選択してください"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
              />
            </Item>
            <Button block primary onPress={this.submit}>
              <Text>登録</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
  submit = () => {
    db.transaction(
      tx => {
        count = tx.executeSql('select count(*) from reminders');
        tx.executeSql('insert into reminders (id, title, date) values (?, ?, ?)', [count + 1, this.state.title, this.state.chosenDate.toString().substr(4, 12)],null,null);
        tx.executeSql('select * from reminders', [], (_, { rows }) => console.log(JSON.stringify(rows)));
      },
    );
    this.props.navigation.navigate("Reminder");
  }

  sakujo = () => {
    db.transaction(
      tx => {
        tx.executeSql("delete from reminders;");
      },
    );
    this.props.navigation.navigate("Reminder")
  };
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    height: 54 + Header.currentHeight,
  },
  h1:{
    paddingTop: 10,
    fontSize: 25,
    paddingBottom: 10,
  },
});
