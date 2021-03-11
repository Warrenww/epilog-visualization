import { AppContainer } from './styles';
import Navigation from './Navigation';
import 'antd/dist/antd.dark.css';

const App = () => {


  return (
    <AppContainer>
      <Navigation />
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
    </AppContainer>
  );
}

export default App;
