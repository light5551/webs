import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";
import BasicComponent from "../../ifaces/BasicComponent";

class AddMemberModal extends BasicComponent{
    constructor(props) {
        super(props,"http://localhost:4201/members/");
    }
    render() {
        return (
            <ModalTemplate id="AddMember" title="Add Member" fun={() => {
                this.send();
            }}>
                    <InputModal id='MemberName' ph='Name/Surname'>Name of Member</InputModal>
                    <InputModal id='MemberMoney' ph='$'/>
            </ModalTemplate>
        )
    }

    async send() {
        const data = {name: document.getElementById('MemberName').value,
                      money: document.getElementById('MemberMoney').value };
        await this.sendRequest(data, "POST", "add")
        //this.state.items.push(data);
        //this.forceUpdate();
        await this.Update();
    }
}

export default AddMemberModal;
