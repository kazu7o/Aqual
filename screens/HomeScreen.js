import React from 'react';
import {
  Image,
  StyleSheet,
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
              <Button transparent>
                <Right>
                  <Icon name='md-add'/>
                </Right>
              </Button>
            </Body>
          </CardItem>
        </Card>
      );
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
        <Content padder>
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
});
