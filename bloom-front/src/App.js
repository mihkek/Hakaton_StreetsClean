import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app_reducer from './state_container/reducer'


const store = createStore(app_reducer)

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <Main />
        </Provider>
     </BrowserRouter>
  );
}

export default App;
