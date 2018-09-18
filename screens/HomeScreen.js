import React from 'react';
import {
  Image,
  StyleSheet,
  RefreshControl
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
  Icon
} from 'native-base';
import { ImagePicker, Permissions, SQLite } from 'expo';

const db = SQLite.openDatabase('aqual.db');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      hasCameraRollPermissions: null,
      notes: null,
      refreshing: false,
      list: [],
    };
  }
  async componentWillMount(){
    // カメラロールへのアクセス許可
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermissions: status === 'granted' });
  }
  componentWillMount(){
    db.transaction(
      tx => {
        tx.executeSql("select * from notes", [], (_, { rows }) => this.setState({notes: rows}));
      },
    );
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    db.transaction(
      tx => {
        tx.executeSql("select * from notes", [], (_, { rows }) => this.setState({notes: rows}));
      },
    );
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  }
  sakujo() {
    db.transaction(
      tx => {
        tx.executeSql("delete from notes", []);
      },
    );
  }

  render() {
    var Cards = [];
    if(this.state.notes != null){
      var notes = this.state.notes;
      for(var i = 0; i < notes['length']; i++){
        Cards.push(
          <Card style={{flex: 0}} key={i}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{notes['_array'][i]['title']}</Text>
                  <Text note>{notes['_array'][i]['date']}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Image source={{ uri: notes['_array'][i]['photo'] }} style={{ width: 200, height: 200}} />
                {/*<Text>タイプ：　{notes['_array'][i]['type']}アクアリウム</Text>*/}
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>{notes['_array'][i]['body']}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button transparent>
                  <Icon name='md-trash' />
                </Button>
              </Body>
            </CardItem>
            {/*
            <CardItem>
              <Body>
                <Button transparent onPress={() => console.log(this.state.notes)}>
                  <Right>
                    <Icon name='md-add'/>
                  </Right>
                </Button>
              </Body>
            </CardItem>
            */}
          </Card>
        );
        this.state.list.push(notes['_array'][i]['id']);
      }
    }
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title>ホーム</Title>
          </Body>
          <Right>
            <Button onPress={() => this.props.navigation.navigate('AddTank')} transparent>
              <Icon name='md-add'/>
            </Button>
          </Right>
        </Header>
        <Content
          refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={()=>{this._onRefresh()}}/>
        }>
          {Cards}
          <Left>
          <Button onPress={() => this.sakujo()}transparent>
              <Icon name='md-trash' />
          </Button>
          </Left>
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
