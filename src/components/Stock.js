import React from 'react';


const Badges = {
    normal: 'success',
    puasson: 'warning',
    unified: 'primary',
}

class Stock extends React.Component{
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td><i>{this.props.company}</i></td>
                <td><samp>{this.props.stockCount}</samp></td>
                <td><span className={"badge badge-" + Badges[this.props.distribution]}>{this.props.distribution}</span></td>
                <td><kbd>{this.props.stockPrice + '$'}</kbd></td>
            </tr>
        )
    }
}

export default Stock;
