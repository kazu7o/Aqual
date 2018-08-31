import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Left, Right, Body, Title } from 'native-base';
export default class LogScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>ホーム</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>私の水槽１</Text>
                  <Text note>7/21~</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={require('../assets/images/robot-prod.png')}/>
                <Text>水温：　取得してくる</Text>
                <Text>水位：　取得してくる</Text>
                <Text>魚：　登録情報から引用</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
