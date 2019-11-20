import { subscribeToTimer } from './Api.js';
import React from 'react';
import Header from "./components/Header";
import Content from "./components/Content";
import ModalsAPI from "./components/ModalsButton/ModalsAPI";

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:4201');

class App extends React.Component{
    state = {
        id: -1
    };

    f(){
        socket.on('RELOAD', ()=> {console.log('bad reload2')})
    }

    updateClient = (_id) => {
        this.setState({id: parseInt(_id)})
    }
    constructor (props) {
        super(props);
        console.log('FULL APPPPPPPPPP')
        localStorage.updateStockList = true;
        localStorage.updateMemberList = true;
        localStorage.updateSaledStockList = true;
        subscribeToTimer(() => {this.forceUpdate();console.log('HOP HEY LA LA LEY')});
    }

    render() {
        return (
            <div>
                <Header update={this.updateClient} userId={this.state.id}/>
                <Content userId={this.state.id}/>
                <ModalsAPI update={this.updateClient}/>
            </div>

        )
    }
}

export default App;
