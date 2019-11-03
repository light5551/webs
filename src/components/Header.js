import React from 'react';
import ButtonHeader from "./ButtonHeader";

class Header extends React.Component{
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal"><i><strong>S</strong>tock <strong>E</strong>xchange</i></h5>
                <ButtonHeader name={'Add Member'}></ButtonHeader>
                <ButtonHeader name={'Add Stock'}></ButtonHeader>
                <ButtonHeader name={'Exchange options'}></ButtonHeader>
            </div>
        )
    }
}

export default Header;
