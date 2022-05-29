import React from 'react';
import { Route } from 'react-router-dom';

import Add from './Add';
import Main from './Main';

function App() {
  return (
    <div>
      <Route path="/" component={Main} exact />
      <Route path="/add" component={Add} />
    </div>
  );
}

export default App;