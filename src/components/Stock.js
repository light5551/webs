import React from 'react';
import SpecialButton from "./SpecialButton";


const Badges = {
    Normal: 'success',
    Pois: 'warning',
    Uniform: 'primary',
    Binom: 'danger'
}

const ADMIN = 0;
const NOBODY = -1;

class Stock extends React.Component{
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td><i>{this.props.company}</i></td>
                <td><samp>{this.props.stockCount}</samp></td>
                <td><span className={"badge badge-" + Badges[this.props.distribution]}>{this.props.distribution}</span></td>
                <td><kbd>{this.props.stockPrice + '$'}</kbd></td>
                { this.isValid() && this.isAdmin() ?
                    <td><SpecialButton colour='yellow' id={this.props.id} name='EditStock' fun={() => {
                        console.log('EDIT ' + this.props.id);
                        localStorage.editId = this.props.id;
                    }}>Edit</SpecialButton></td>
                    :
                         this.isNobody() ?
                    <td><div/></td>
                             :
                    <td><SpecialButton colour='red' fun={() => {
                                    console.log('BUY ' + this.props.id)
                                }}>Buy</SpecialButton></td>

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
        let opts = this.httpOpts;
        if(data)
            opts.body = JSON.stringify(data);
        opts.method = method;
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
