import React from 'react';
import Header from "./components/Header";
import Content from "./components/Content";
import ModalsAPI from "./components/ModalsButton/ModalsAPI";


class App extends React.Component{
    state = {
        id: -1
    };
    updateClient = (_id) => {
        this.setState({id: parseInt(_id)})
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
