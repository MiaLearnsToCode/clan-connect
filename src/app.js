import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './style.scss'


import Navbar from './components/common/Navbar'
import Homepage from './components/common/Homepage'
import Footer from './components/common/Footer'

import Registerfamily from './components/auth/Registerfamily'
import Loginfamily from './components/auth/Loginfamily'
import Showfamily from './components/auth/Showfamily'
import Registeruser from './components/auth/Registeruser'
import Loginuser from './components/auth/Loginuser'

import Indexannouncements from './components/announcements/Indexannouncements'
import Show from './components/announcements/Show'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <Switch>
            <Route path="/families/:familyId/announcements/:id" component={Show}/>
            <Route path="/families/:familyId/announcements" component={Indexannouncements}/>
            <Route path="/families/:familyId/login" component={Loginuser}/>
            <Route path="/families/:familyId/register" component={Registeruser}/>
            <Route path="/families/:familyId" component={Showfamily}/>
            <Route path="/loginfamily" component={Loginfamily}/>
            <Route path="/registerfamily" component={Registerfamily}/>
            <Route exact path="/" component={Homepage}/>
          </Switch>
          <Footer />
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
