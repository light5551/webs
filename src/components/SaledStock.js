import React from 'react';
import SpecialButton from "./SpecialButton";
import InputModal from "./ModalsButton/InputModal";

class SaledStock extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td><i>{this.props.company}</i></td>
                <td><samp>{this.props.count}</samp></td>
                <td><SpecialButton colour='blue' fun={async () => {
                    console.log('SOLD!')
                    let count = this.props.count;
                    let buydata = {id: this.props.id, number: this.props.count};
                    await this.sendRequest(buydata, "POST", 'http://localhost:4201/securities/setcount')
                    let selldata = {id: this.props.id, number: -this.props.count};
                    await this.sendRequest(selldata, "POST", 'http://localhost:4201/users/stock' + this.props.userId)
                    let price = await this.sendRequest(null, "GET", 'http://localhost:4201/securities/price' + this.props.id)
                    let price_data = await price.json();
                    let moneydata = {
                        id: this.props.userId,
                        money: parseInt(price_data.price) * count
                    };
                    //console.log("DAT: ", moneydata, ' count: ', this.props.count)
                    this.sendRequest(moneydata, "POST", 'http://localhost:4201/members/edit')
                }}>Sell</SpecialButton></td>
            </tr>
        )
    }

    httpOpts = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async sendRequest(data = null, method = "GET", dest = "") {
        let opts = Object.assign({}, this.httpOpts);
        if (data)
            opts.body = JSON.stringify(data);
        opts.method = method;
        return await fetch(dest, opts)
            .catch(function () {
                console.log("error");
            });
    }
}

export default SaledStock;
