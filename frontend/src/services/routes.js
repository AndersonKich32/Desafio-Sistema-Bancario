import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react'
import Cadastro from '../pages/cadastro'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/register' component={Cadastro}/>
            </Switch>
        </BrowserRouter>
    )
}
