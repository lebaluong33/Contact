import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Screens from './screen/Screen';

export const App = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene {...Screens.Main} initial />
        <Scene {...Screens.addContact} />
        <Scene {...Screens.editContact} />
      </Stack>
    </Router>
  );
};
export default App;