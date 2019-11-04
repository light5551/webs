import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";

class ExchangeOptionsModal extends React.Component{

    render() {
        return (
            <ModalTemplate id="ExchangeOptions" title='Exchange Options' fun={this.send}>
                <InputModal id='ExchangeOptionsDelay'>Cost update delay</InputModal>
                <InputModal id='ExchangeOptionsPeriod'>Time period</InputModal>
            </ModalTemplate>
        )
    }

    send() {
        console.log(document.getElementById('ExchangeOptionsDelay').value)
        console.log(document.getElementById('ExchangeOptionsPeriod').value)
    }
}

export default ExchangeOptionsModal;
