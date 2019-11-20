import React from 'react';
import SpecialButton from "./SpecialButton";
import InputModal from "./ModalsButton/InputModal";

const Badges = {
    Normal: 'success',
    Pois: 'warning',
    Uniform: 'primary',
    Binom: 'danger'
}

const ADMIN = 0;
const NOBODY = -1;

class Stock extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {time: 0};
        //this.timer(Math.floor(Math.random() *  (15000 - 5000) + 5000));
    }

    timer(delay: number) {
        setInterval(async () => {
            let coeff = Math.random() *(1.05 - 0.95) + 0.95;
            console.log(this.state.time + ' c: ' + coeff)
            await this.sendRequest({id: this.props.id, price: Math.floor(parseInt(this.props.stockPrice)*coeff)}, "POST",'http://localhost:4201/securities/setprice')
            this.setState({time: new Date().getMilliseconds()})
        }, delay)
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td><i>{this.props.company}</i></td>
                <td><samp>{this.props.stockCount}</samp></td>
                <td><span className={"badge badge-" + Badges[this.props.distribution]}>{this.props.distribution}</span></td>
                <td><kbd>{Math.floor(this.props.stockPrice) + '$'}</kbd></td>
                { this.isValid() && this.isAdmin() ?
                    <td><SpecialButton colour='yellow' id={this.props.id} name='EditStock' fun={() => {
                        console.log('EDIT ' + this.props.id);
                        localStorage.editId = this.props.id;
                    }}>Edit</SpecialButton></td>
                    :
                         this.isNobody() ?
                    <td><div/></td>
                             :

                        <td className='list-group list-group-horizontal'>
                            <div className='d-flex align-items-baseline'><input type='number' id={'BuyCount' + this.props.id} min={1} max={this.props.stockCount}/> </div>
                            <div className='d-flex align-items-baseline ml-2'><SpecialButton colour='red' fun={async () => {

                                console.log('BBBBBBBBBBBBBBBBBBBBBBBBBB');
                                let value = document.getElementById('BuyCount'+this.props.id);
                                value.stepUp(0);
                                console.log('BUY count: ' + value.value + '| USER: ' + this.props.userId)
                                let money = await this.sendRequest(null, "GET", 'http://localhost:4201/members/money' + this.props.userId)
                                let money_data = await money.json();

                                //console.log('BOB: ' + money_data.money)

                                if (money_data.money >= value.value * this.props.stockPrice) {
                                    console.log('SOLD!')
                                    let buydata = {id: this.props.id, number: -value.value};
                                    this.sendRequest(buydata, "POST", 'http://localhost:4201/securities/setcount')
                                    let selldata = {id: this.props.id, number: value.value};
                                    this.sendRequest(selldata, "POST", 'http://localhost:4201/users/stock' + this.props.userId)
                                    let moneydata = {
                                        id: this.props.userId,
                                        money: -(parseInt(this.props.stockPrice) * value.value)
                                    };
                                    await this.sendRequest(moneydata, "POST", 'http://localhost:4201/members/edit')
                                    localStorage.updateSaledStockList = true;
                                    this.props.updateAll();
                                    //this.props.update();

                                    //localStorage.updateStockList = true;
                                    //localStorage.updateMemberList = true;

                                }
                            }}>Buy</SpecialButton></div>
                        </td>

                }
                {    this.isValid() && this.isAdmin() &&
                <td><SpecialButton colour='red' fun={() => {
                        this.sendRequest({id: parseInt(this.props.id)}, 'POST',
                            'http://localhost:4201/securities/del')
                    }}>Remove</SpecialButton></td>
                }
            </tr>
        )
    }

    httpOpts = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    async sendRequest(data = null, method = "GET", dest = "")
    {
        let opts = Object.assign({}, this.httpOpts);
        if(data)
            opts.body = JSON.stringify(data);
        opts.method = method;
        localStorage.updateStockList = true;
        localStorage.updateMemberList = true
        return await fetch(dest, opts)
            .catch(function() {
                console.log("error");
            });

    }

    isNobody() {
        return this.props.userId === -1
    }
    isAdmin (){
        return this.props.userId === 0
    }

    isValid(){
        return this.props.userId >= 0
    }


}

export default Stock;
