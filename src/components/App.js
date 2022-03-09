import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/Auth'
import { Signup } from './Signup'
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { PrivateRoute } from './PrivateRoute'

export function App() {
  return (
    <div className="m-8"> 
      <h1 className="text-3xl text-red-400">TBR List</h1>

      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}