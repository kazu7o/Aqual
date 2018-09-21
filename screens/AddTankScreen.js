import React from 'react';
import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
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
  Textarea,
  Toast,
} from 'native-base';
import { ImagePicker, Permissions, SQLite, Camera } from 'expo';

const db = SQLite.openDatabase('aqual.db');

export default class AddTankScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      //selected2: "淡水",
      chosenDate: new Date(),
      image: null,
      hasCameraRollPermissions: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
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

  }

  _pickCameraroll = async() => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermissions: status === 'granted' });
    let result = await ImagePicker.launchImageLibraryAsync({
      allowEditing: false
    });
    console.log(result);
    if(!result.cancelled){
      this.setState({ image: result.uri });
    }
  }

  _takePhoto = async() => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    let result = await ImagePicker.launchCameraAsync({
      allowEditing: false
    });

    console.log(result);

    if (!result.cancelled){
      this.setState({ image: result.uri });
    }
  }
  //生体記録テーブル
  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists notes (id integer primary key not null, title text, date text, body text, photo text);'
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
            <Title>新規追加</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text style={styles.h1}>日記を追加</Text>
          <KeyboardAvoidingView behavior='padding'>
            <Form>
              <Item stackedLabel>
                <Label>タイトル</Label>
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
              <Item stackedLabel>
                <Label>写真</Label>
                <Button onPress={() => this._pickCameraroll()} transparent>
                  <Text>ギャラリーから選択</Text>
                </Button>
                <Button onPress={() => this._takePhoto()} transparent>
                  <Text>カメラを起動</Text>
                </Button>
                {hasCameraRollPermissions && image && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}
              </Item>
              <Item stackedLabel>
                <Label>本文</Label>
                <Textarea rowSpan={5} bordered placeholder="ここに入力してください" style={{ width: 300 }} onChangeText={(text) => {this.setState({body: text}); }}/>
              </Item>
              <Button block primary onPress={this.submit}>
                <Text>登録</Text>
              </Button>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
  submit = () => {
    db.transaction(
      tx => {
        count = tx.executeSql('select count(*) from notes');
        tx.executeSql('insert into notes (id, title, date, body, photo) values (?, ?, ?, ?, ?)', [count + 1, this.state.title, this.state.chosenDate.toString().substr(4, 12), this.state.body, this.state.image],null,null);
        tx.executeSql('select * from notes', [], (_, { rows }) => console.log(JSON.stringify(rows)));
      },
    );
    this.props.navigation.navigate("Home");
  }

  //全レコード削除（デバッグ用）
  sakujo = () => {
    db.transaction(
      tx => {
        tx.executeSql("delete from notes;");
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
