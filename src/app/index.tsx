import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { ProductList, ProductInsert, ProductUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/movies/list" exact component={ProductList} />
                <Route path="/movies/create" exact component={ProductInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={ProductUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App