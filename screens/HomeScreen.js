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
    }, 1500);
  }
  all_sakujo() {
    db.transaction(
      tx => {
        tx.executeSql("delete from notes", []);
      },
    );
    this._onRefresh();
  }
  delCard(id){
    console.log(id);
    db.transaction(
      tx => {
        tx.executeSql("delete from notes where id = ?", [id]);
      },
    );
    this._onRefresh();
  }
  render() {
    var Cards = [];
    if(this.state.notes != null){
      var notes = this.state.notes['_array'];
      Cards = notes.map(cardInfo => (
        <Card style={{flex: 0}} key={cardInfo.id}>
          <CardItem bordered>
            <Left>
              <Body>
                <Text>{cardInfo.title}</Text>
                <Text note>{cardInfo.date}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Image source={{ uri: cardInfo.photo }} style={{ width: 200, height: 200}} />
              {/*<Text>タイプ：　{notes['_array'][i]['type']}アクアリウム</Text>*/}
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{cardInfo.body}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Right>
              <Button style={styles.trash} onPress={() => this.delCard(cardInfo.id)} transparent>
                <Icon name='md-trash' />
              </Button>
              </Right>
            </Body>
          </CardItem>
        </Card>
      ));
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
  trash: {
    paddingLeft: 200,
  },
});
