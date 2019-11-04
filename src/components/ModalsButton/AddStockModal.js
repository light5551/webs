import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";

class AddStockModal extends React.Component{
    render() {
        return (
            <ModalTemplate id="AddStock" title="Add Stock" fun={this.send}>
                <InputModal id='StockCompany' ph='Name/Surname'>Company</InputModal>
                <InputModal id='StockCount'>Count</InputModal>
            </ModalTemplate>
        )
    }

    send() {
        console.log(document.getElementById('StockCompany').value)
        console.log(document.getElementById('StockCount').value)
    }
}

export default AddStockModal;
