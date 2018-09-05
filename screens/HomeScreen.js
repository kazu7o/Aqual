import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Left, Right, Body, Title, Button, Icon } from 'native-base';
import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    var Cards = [];
    for(var i = 0; i < 3; i++){
      Cards.push(
        <Card style={{flex: 0}} key={i}>
          <CardItem bordered>
            <Left>
              <Body>
                <Text>私の水槽１</Text>
                <Text note>2018/07/21~2ヶ月20日</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Image source={require('../assets/images/robot-prod.png')}/>
              <Text>・淡水アクアリウム</Text>
              <Text>水槽サイズ：50x50x50</Text>
              <Text>水量：5リットル</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>・生体記録</Text>
              <Text>09/05 いつも通り</Text>
              <Text>09/06 元気♪</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button onPress={_handleAddPress} transparent>
                <Right>
                  <Icon name='ios-add'/>
                </Right>
              </Button>
            </Body>
          </CardItem>
        </Card>
      );
    }
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>ホーム</Title>
          </Body>
          <Right>
            <Button onPress={_handleAddPress} transparent>
              <Icon name='ios-add'/>
            </Button>
          </Right>
        </Header>
        <Content padder>
          {Cards}
        </Content>
      </Container>
    );
  }
}

_handleAddPress = () => {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
/*
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
*/
