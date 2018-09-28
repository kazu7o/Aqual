import React from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
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
  Form,
  Item,
  Input,
  Label,
  Picker,
} from 'native-base';

export default class CalcScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      z: 0,
      xyz: 0,
      selected2: "滴",
      perLiter: 1,
      medAmount: 0,
      capacity: 0,
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title>ツール</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <KeyboardAvoidingView behavior='padding'>
            <Form>
              <Text style={styles.h1}>容量計算（単位：cm）</Text>
              <Left>
                <Image source={require('../assets/images/calc_tank.png')} />
              </Left>
              <Item stackedLabel>
                <Label>X</Label>
                <Input keyboardType= 'numeric' onChangeText={(text) => {this.setState({x: text}); }}/>
              </Item>
              <Item stackedLabel>
                <Label>Y</Label>
                <Input keyboardType= 'numeric' onChangeText={(text) => {this.setState({y: text}); }}/>
              </Item>
              <Item stackedLabel>
                <Label>Z</Label>
                <Input keyboardType= 'numeric' onChangeText={(text) => {this.setState({z: text}); }}/>
              </Item>
              <Left>
                <Text style={styles.result} onChangeText={(text)=>{this.setState(xyz: text)}}>{(this.state.x * this.state.y * this.state.z)/1000}L</Text>
              </Left>
              <Text style={styles.h1}>添加剤投与量</Text>
              <Text>マニュアルに記載されている量を入力してください</Text>
              <Item>
                <Input keyboardType='numeric' onChangeText={(text) => {this.setState({perLiter: text}); }}/>
                <Text>リットル当たり、</Text>
                <Input keyboardType='numeric' onChangeText={(text) => {this.setState({medAmount: text}); }}/>
                <Picker
                  mode="dropdown"
                  style={{ width: 80}}
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="滴" value="滴" />
                  <Picker.Item label="ポンプ" value="ポンプ" />
                  <Picker.Item label="スプーン" value="スプーン" />
                  <Picker.Item label="ml" value="ml" />
                  <Picker.Item label="g" value="g" />
                </Picker>
              </Item>
              <Text>水槽の容量</Text>
              <Item>
                {/*<Input value={((this.state.x * this.state.y * this.state.z)/1000).toString()} onChangeText={(text) => {this.setState({xyz: text}); }}/><Text style={{ width: 80}}>リットル</Text>*/}
                <Input value={this.state.capacity.toString()} onChangeText={(text) => {this.setState({capacity: text}); }} /><Text style={{ width: 80}}>リットル</Text>
              </Item>
              <Left>
                <Text style={styles.result}>{this.state.capacity/this.state.perLiter*this.state.medAmount}{this.state.selected2}</Text>
              </Left>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 42,
    paddingBottom: 14,
    height: 54 + Header.currentHeight,
  },
  h1: {
    paddingTop: 10,
    fontSize: 25,
    paddingBottom: 10,
  },
  result: {
    paddingLeft: 200,
    fontSize: 25,
  },
});
