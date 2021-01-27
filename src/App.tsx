import React from 'react';
import logo from './logo.svg';
import st from './app.module.scss';

function App() {
  return (
    <div className={st.app}>
      <img src={logo} className={st.appLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
