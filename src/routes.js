import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
 createStackNavigator(
  {
   Main,
   User,
  },
  {
   headerLayoutPreset: 'center',
   headerBackTitleVisible: true,
   headerBackTitle: '',
   defaultNavigationOptions: {
    headerStyle: {
     backgroundColor: '#006371',
    },
    headerTintColor: '#FFFF',
   },
  }
 )
);

export default Routes;
