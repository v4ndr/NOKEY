import * as React from 'react';
import Navigation from './navigation/Navigation'
import Store from './store/configureStore'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}

export default App;