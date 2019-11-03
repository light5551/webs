import React from 'react';

class Member extends React.Component{
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.name}</td>
                <td><kbd>{this.props.money + '$'}</kbd></td>
            </tr>
        )
    }
}

export default Member;
