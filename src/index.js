import 'react-native-gesture-handler';
import React from 'react';
import './config/ReactotronConfig';

import { StatusBar } from 'react-native';
import Routes from './routes';

console.tron.log('FSGDFGHG');

const GitApp = () => {
 return (
  <>
   <StatusBar barStyle="light-content" backgroundColor="#006171" />
   <Routes />
  </>
 );
};

export default GitApp;
