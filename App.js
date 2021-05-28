import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './navigation/DrawerContent';
import TabsScreen from "./screens/TabsScreen";
const Drawer = createDrawerNavigator();
  function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      <Drawer.Screen name="Home" component={TabsScreen}   /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;
