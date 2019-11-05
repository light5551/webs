import React from 'react';


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
                    <p>admin</p>:
                    <p>user</p>

                }
            </tr>
        )
    }

    isAdmin (){
        return this.props.userId === 0
    }

    isValid(){
        return this.props.userId >= 0
    }
}

export default Stock;
