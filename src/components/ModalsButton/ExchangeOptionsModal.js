import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";
import BasicComponent from "../../ifaces/BasicComponent";

class ExchangeOptionsModal extends BasicComponent{
    constructor(props) {
        super(props,"http://localhost:4201/options/");
    }

    render() {
        console.log(this.state.items)
        return (
            <ModalTemplate id="ExchangeOptions" title='Exchange Options' fun={() => {this.send()}}>
                <InputModal id='ExchangeOptionsDelay' value={this.state.items.cost_update_delay}>Cost update delay</InputModal>
                <InputModal id='ExchangeOptionsPeriod' value={this.state.items.bidding_time_period}>Time period</InputModal>
            </ModalTemplate>
        )
    }

    async send() {
        const data = {cost_update_delay: document.getElementById('ExchangeOptionsDelay').value,
                      bidding_time_period: document.getElementById('ExchangeOptionsPeriod').value}
        const res = await this.sendRequest(data, "POST", "edit")
        console.log(document.getElementById('ExchangeOptionsDelay').value)
        console.log(document.getElementById('ExchangeOptionsPeriod').value)
    }
}

export default ExchangeOptionsModal;
