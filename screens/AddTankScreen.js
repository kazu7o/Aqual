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
import { ImagePicker, Permissions } from 'expo';
{/*
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBZT5aRVmNc1uLaW4Rts_Xt8m-d2PPDScA",
  authDomain: "aqual-e9327.firebaseapp.com",
  databaseURL: "https://aqual-e9327.firebaseio.com",
  projectId: "aqual-e9327",
  storageBucket: "aqual-e9327.appspot.com",
  messagingSenderId: "1092530998404"
};

firebase.initializeApp(firebaseConfig);
*/}



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
            <Button block primary>
              <Text>登録</Text>
            </Button>
            <Text>
              name: {this.state.name}
              chosenDate: {this.state.chosenDate.toString()}
              state: {this.state.selected2}
            </Text>
            {hasCameraRollPermissions && image && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}
          </Form>
        </Content>
      </Container>
    );
  }
}

{/*
_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [16, 9],
  });

  console.log(result);

  if(!result.cancelled){
    this.setState({ image: result.uri });
  }
};
*/}

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
