import { useState } from 'react';
import { AppContainer } from './styles';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import 'antd/dist/antd.dark.css';

const App = () => {
  const [activeLog, setActiveLog] = useState<string>('');
  return (
    <AppContainer>
      <Navigation setActiveLog={setActiveLog}/>
      <Dashboard filename={activeLog}/>
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
