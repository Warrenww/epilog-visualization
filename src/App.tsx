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
//
// logs = log.split('\n');
// auth = logs.filter(x => x.includes('User Authenticator'));
// /UUID of player ((\d|\w)+)/.exec(auth[0])[1];
// /(\d|\w){8}-(\d|\w){4}-(\d|\w){4}-(\d|\w){4}-(\d|\w){12}/.exec(auth[0])[0];
// auth.map(x => {
// const username= /UUID of player ((\d|\w)+)/.exec(x);
// const uid = /(\d|\w){8}-(\d|\w){4}-(\d|\w){4}-(\d|\w){4}-(\d|\w){12}/.exec(x);
// if (username && uid) return {username: username[1], uid: uid[0]}
// else console.log(x)
// }).reduce((acc, curr) => acc.find(x => x?.uid === curr?.uid) ? [...acc] : [...acc,curr] ,[])
// .filter(x => x)
// .sort((a,b) => a.username > b.username ? -1 : 1)
