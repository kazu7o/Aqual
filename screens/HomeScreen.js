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
      tanks: null,
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
        tx.executeSql("select * from tanks", [], (_, { rows }) => this.setState({tanks: rows}));
      },
    );
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    db.transaction(
      tx => {
        tx.executeSql("select * from tanks", [], (_, { rows }) => this.setState({tanks: rows}));
      },
    );
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  }
  sakujo() {
    db.transaction(
      tx => {
        tx.executeSql("delete from tanks", []);
      },
    );
  }

  render() {
    var Cards = [];
    if(this.state.tanks != null){
      var tanks = this.state.tanks;
      for(var i = 0; i < tanks['length']; i++){
        Cards.push(
          <Card style={{flex: 0}} key={i}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{tanks['_array'][i]['name']}</Text>
                  <Text note>{tanks['_array'][i]['date']}</Text>
                  <Text note>{tanks['_array'][i]['id']}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Image source={{ uri: tanks['_array'][i]['photo'] }} style={{ width: 200, height: 200}} />
                <Text>タイプ：　{tanks['_array'][i]['type']}アクアリウム</Text>
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
                <Button transparent onPress={() => console.log(this.state.tanks)}>
                  <Right>
                    <Icon name='md-add'/>
                  </Right>
                </Button>
              </Body>
            </CardItem>
            */}
          </Card>
        );
        this.state.list.push(tanks['_array'][i]['id']);
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
