import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";

class AddMemberModal extends React.Component{
    render() {
        return (
            <ModalTemplate id="AddMember" title="Add Member" fun={this.send}>
                    <InputModal id='MemberName' ph='Name/Surname'>Name of Member</InputModal>
                    <InputModal id='MemberMoney' ph='$'></InputModal>
            </ModalTemplate>
        )
    }

    send() {
        console.log(document.getElementById('MemberName').value)
        console.log(document.getElementById('MemberMoney').value)
    }
}

export default AddMemberModal;
