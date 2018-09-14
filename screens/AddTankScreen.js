import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label,
  DatePicker,
  Picker,
  ListItem,
  Radio,
} from 'native-base';
import { ImagePicker, Permissions, SQLite } from 'expo';

const db = SQLite.openDatabase('aqual.db');

export default class AddTankScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      selected2: "淡水",
      chosenDate: new Date(),
      image: null,
      hasCameraRollPermissions: null,
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({
      chosenDate: newDate
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  async componentWillMount(){
    // カメラロールへのアクセス許可
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermissions: status === 'granted' });
  }

  //水槽テーブル作成（初期化）
  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists tanks (id integer primary key not null, name text, date text, type text, photo text);'
      );
    });
  }
  render() {
    let {hasCameraRollPermissions} = this.state;
    let { image } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button onPress={() => this.props.navigation.navigate('Home')} transparent>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>水槽追加</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text style={styles.h1}>水槽を追加</Text>
          <Form>
            <Item stackedLabel>
              <Label>名前</Label>
              <Input onChangeText={(text) => {this.setState({name: text}); }}/>
            </Item>
            <Item stackedLabel>
              <Label>始めた日</Label>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(1990, 1, 1)}
                maximumDate={new Date(2038, 12, 31)}
                locale={"ja"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={true}
                animationType={"fade"}
                androidMode={"default"}
                //placeHolderText="開始日を選択してください"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
              />
            </Item>
            <Item stackedLabel picker>
              <Label>水質</Label>
              <Picker
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="淡水" value="淡水" />
                <Picker.Item label="海水" value="海水" />
                <Picker.Item label="汽水" value="汽水" />
              </Picker>
            </Item>
            {/*
            <Item stackedLabel>
              <Label>状態</Label>
              <ListItem>
                <Radio selected={true} />
                <Text>運営中</Text>
              </ListItem>
              <ListItem>
                <Radio selected={false} />
                <Text>終了</Text>
              </ListItem>
            </Item>
            */}
            <Item stackedLabel>
              <Label>サムネイル</Label>
              <Button onPress={async () => {let result = await ImagePicker.launchImageLibraryAsync(); console.log(result); this.setState({image: result.uri})}} transparent>
                <Text>ギャラリーから選択</Text>
              </Button>
            </Item>
            {hasCameraRollPermissions && image && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}
            <Button block primary onPress={this.submit}>
              <Text>登録</Text>
            </Button>
            <Text>
              name: {this.state.name}
              chosenDate: {this.state.chosenDate.toString()}
              state: {this.state.selected2}
            </Text>
          </Form>
        </Content>
      </Container>
    );
  }
  submit = () => {
    db.transaction(
      tx => {
        count = tx.executeSql('select count(*) from tanks');
        tx.executeSql('insert into tanks (id, name, date, type, photo) values (?, ?, ?, ?, ?)', [count + 1, this.state.name, this.state.chosenDate.toString(), this.state.selected2, this.state.image],null,null);
        tx.executeSql('select * from tanks', [], (_, { rows }) => console.log(JSON.stringify(rows)));
      },
    );
    this.props.navigation.navigate("Home");
  }

  //全レコード削除
  sakujo = () => {
    db.transaction(
      tx => {
        tx.executeSql("delete from tanks;");
      },
    );
    this.props.navigation.navigate("Home")
  };
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    height: 54 + Header.currentHeight,
  },
  h1:{
    paddingTop: 10,
    fontSize: 25,
    paddingBottom: 10,
  },
});
