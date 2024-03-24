import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopNav from './components/TopNav'
import PrivateRoute from './utils/PrivateRoute'
import Home from './booking/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './user/Dashboard'
import DashboardSeller from './user/DashboardSeller'
import NewHotel from './hotels/NewHotel'
import StripeCallback from './stripe/StripeCallback'
import EditHotel from './hotels/EditHotel'
import HotelDetails from './hotels/HotelDetails'
import StripeSuccess from './stripe/StripeSuccess'
import StripeCancel from './stripe/StripeCancel'
import SearchResult from './hotels/SearchResult'
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <section className="flex flex-col items-center">
        <TopNav />
        <ToastContainer position="top-center" />
        <section className="w-full max-w-screen-lg">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/dashboard/seller"
              component={DashboardSeller}
            />
            <PrivateRoute exact path="/hotels/new" component={NewHotel} />
            <PrivateRoute
              exact
              path="/stripe/callback"
              component={StripeCallback}
            />
            <PrivateRoute
              exact
              path="/hotel/edit/:hotelId"
              component={EditHotel}
            />
            <Route exact path="/hotel/:hotelId" component={HotelDetails} />
            <PrivateRoute
              exact
              path="/stripe/success/:hotelId"
              component={StripeSuccess}
            />
            <PrivateRoute
              exact
              path="/stripe/cancel"
              component={StripeCancel}
            />
            <Route exact path="/search-result" component={SearchResult} />
          </Switch>
        </section>
      </section>
    </BrowserRouter>
  )
}

export default App
