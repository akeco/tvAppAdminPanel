import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../redux/reducers/index';
import blue from 'material-ui/colors/blue';
import ActivateQuestionList from '../ActivateQuestionList';
import SocketConnectionHoC from '../SocketConnectionHoC';
import Header from '../Header';
import QuestionFormPage from '../QuestionFormPage';
import LoginPage from '../LoginPage';
import AuthorizationComponent from '../AuthorizationComponent';
import UsersManagement from '../UsersManagement';

var store = createStore(reducers);

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: blue
    }
});


const Main = (props)=>{
  return(
      <Provider store={store}>
          <SocketConnectionHoC>
              <MuiThemeProvider theme={theme}>
                  <Router>
                      <AuthorizationComponent>
                          <Header/>
                          <Switch>
                              <Route path="/" exact={true} component={ActivateQuestionList} />
                              <Route path="/postavke" component={QuestionFormPage} />
                              <Route path="/users" component={UsersManagement} />
                              <Route path="/login" component={LoginPage} />
                              <Route component={ActivateQuestionList} />
                          </Switch>
                      </AuthorizationComponent>
                  </Router>
              </MuiThemeProvider>
          </SocketConnectionHoC>
      </Provider>
  );
};

export default Main;
