import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";
import BasicComponent from "../../ifaces/BasicComponent";

class AddStockModal extends BasicComponent{
    constructor(props) {
        super(props,"http://localhost:4201/securities/");
    }
    render() {
        return (
            <ModalTemplate id="AddStock" title="Add Stock" fun={() => {this.send();}}>
                <InputModal id='StockCompany' ph='Name/Surname'>Company</InputModal>
                <InputModal id='StockCount'>Count</InputModal>
                <InputModal id='StockStartPrice'>Start Price</InputModal>
                <InputModal id='StockDistr'>Distribution</InputModal>
            </ModalTemplate>
        )
    }

    async send() {
        const data = {company: document.getElementById('StockCompany').value,
                      number: document.getElementById('StockCount').value,
                      distribution: document.getElementById('StockDistr').value,
                      start_price: document.getElementById('StockStartPrice').value };
        await this.sendRequest(data, "POST", "add")

    }
}

export default AddStockModal;
