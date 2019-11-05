import React from 'react';
import ModalTemplate from "./ModalTemplate";
import InputModal from "./InputModal";
import BasicComponent from "../../ifaces/BasicComponent";

class LogInModal extends BasicComponent{
    constructor(props) {
        super(props,"http://localhost:4201/users/");
    }
    render() {
        return (
            <ModalTemplate id="LogIn" title="Log In" save_text={'Log In'} fun={() => {
                this.send();
            }}>
                    <InputModal id='Username' ph='username'>Log In</InputModal>
                    <InputModal id='Password' ph='password'/>
            </ModalTemplate>
        )
    }

    async send() {
        const data = {
            uname: document.getElementById('Username').value,
                      password: document.getElementById('Password').value
        };
        const res = await this.sendRequest(data, "POST", "login");
        console.log(res);
        const json = await res.json();
        console.log('id: ', json.id)
        this.props.update(json.id);
    }
}

export default LogInModal;
