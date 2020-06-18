import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
 Container,
 Form,
 Input,
 SubmitButton,
 Avatar,
 ProfileButtonText,
 ProfileButton,
 Bio,
 Name,
 User,
 List,
} from './styles';
import api from '../../service/api';

export default class Main extends Component {
 static navigationOptions = {
  title: 'Usuários',
 };

 static propTypes = {
  navigation: PropTypes.shape({
   navigate: PropTypes.func,
  }).isRequired,
 };

 state = {
  newUser: '',
  users: [],
  loading: false,
 };

 async componentDidMount() {
  const users = await AsyncStorage.getItem('users');

  if (users) {
   this.setState({ users: JSON.parse(users) });
  }
 }

 componentDidUpdate(_, prevState) {
  const { users } = this.state;

  if (prevState.users !== users) {
   AsyncStorage.setItem('users', JSON.stringify(users));
  }
 }

 handleAddUser = async () => {
  const { users, newUser } = this.state;

  this.setState({ loading: true });

  const response = await api.get(`/users/${newUser}`).catch((error) => {
   this.setState({ loading: false, error });
  });

  const data = {
   name: response.data.name,
   login: response.data.login,
   bio: response.data.bio,
   avatar: response.data.avatar_url,
  };

  this.setState({
   users: [...users, data],
   newUser: '',
   loading: false,
   error: false,
  });

  Keyboard.dismiss();
 };

 handleNavigate = (user) => {
  const { navigation } = this.props;

  navigation.navigate('User', { user });
 };

 render() {
  const { users, newUser, loading, error } = this.state;
  return (
   <Container>
    {error ? (
     <ProfileButtonText error={error}>{error.name}</ProfileButtonText>
    ) : null}
    <Form>
     <Input
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Adicionar usuário"
      value={newUser}
      onChangeText={(text) => this.setState({ newUser: text })}
      onSubmitEditing={this.handleAddUser}
     />
     <SubmitButton loading={loading} onPress={this.handleAddUser}>
      {loading ? (
       <ActivityIndicator color="#FFF" />
      ) : (
       <Icon name="add" size={20} color="#FFF" />
      )}
     </SubmitButton>
    </Form>

    <List
     data={users}
     keyExtractor={(user) => user.login}
     renderItem={({ item }) => (
      <User>
       <Avatar source={{ uri: item.avatar }} />
       <Name>{item.name}</Name>
       <Bio>{item.bio}</Bio>

       <ProfileButton
        onPress={() => {
         this.handleNavigate(item);
        }}
       >
        <ProfileButtonText>Ver Perfil</ProfileButtonText>
       </ProfileButton>
      </User>
     )}
    />
   </Container>
  );
 }
}

Main.navigationOptions = {
 title: 'Usuários',
};
