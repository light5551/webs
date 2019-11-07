import React from 'react';
import SpecialButton from "./SpecialButton";
import InputModal from "./ModalsButton/InputModal";

class SaledStock extends React.Component{
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td><i>{this.props.company}</i></td>
                <td><samp>{this.props.count}</samp></td>
                <td><SpecialButton colour='blue' fun={() => {console.log('sell fdsjfsdj')}}>sell</SpecialButton></td>
            </tr>
        )
    }
}

export default SaledStock;
