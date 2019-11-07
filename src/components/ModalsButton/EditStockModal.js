import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";
import BasicComponent from "../../ifaces/BasicComponent";

class EditStockModal extends BasicComponent{
    constructor(props) {
        super(props,"http://localhost:4201/securities/");
    }
    render() {
        return (
            <ModalTemplate id="EditStock" title="Edit Stock" fun={() => {console
                .log('aaaaaaaaaaaaaaaaaaaaa');this.send()}}>
                <InputModal id='EditStockCompany' ph='Name/Surname'>Company</InputModal>
                <InputModal id='EditStockCount'>Count</InputModal>
                <InputModal id='EditStockStartPrice'>Start Price</InputModal>
                <InputModal id='EditStockDistr'>Distribution</InputModal>
            </ModalTemplate>
        )
    }

    async send() {
        const data = {
            id: parseInt(localStorage.editId),
            company: document.getElementById('EditStockCompany').value,
            number: document.getElementById('EditStockCount').value,
            distribution: document.getElementById('EditStockDistr').value,
            start_price: document.getElementById('EditStockStartPrice').value };
        console.log(data);
        await this.sendRequest(data, "POST", "edit")

    }
}

export default EditStockModal;
