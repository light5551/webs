import React from 'react';
import { MDBContainer, MDBScrollbar } from "mdbreact";
import Member from "./Member";
import BasicComponent from "../ifaces/BasicComponent";
import SpecialButton from "./SpecialButton";

class Members extends BasicComponent{

    constructor(props) {
        super(props, "http://localhost:4201/members/");

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (localStorage.updateMemberList === "true")
        {
            const res = await this.sendRequest()
            const data = await res.json()
            localStorage.updateMemberList = false;
            await this.setState({items: data})
        }
    }

    async Update(id) {
        const  a = await this.sendRequest({id:parseInt(id),money: 1000}, 'POST','edit')
        await console.log(a);
        const res = await this.sendRequest()
        const data = await res.json()
        await this.setState({items: data})
    }

    render() {
        const scrollContainerStyle = { width: "500px", maxHeight: "600px" };
        const { error, isLoaded, items } = this.state;
        let mems = [];
        items.forEach(e => {
            if (this.isAdmin())
                mems.push(<Member key={e.id} id={e.id} name={e.name} money={e.money}>
                    <SpecialButton colour='yellow' fun={() => {
                        localStorage.updateMemberList = true;
                        this.Update(e.id)
                    }}>+1000$</SpecialButton>
                </Member>)
            else
                mems.push(<Member key={e.id} id={e.id} name={e.name} money={e.money}/>)
        });

        return (
            <MDBContainer>
                <div style={scrollContainerStyle}>
                    <div className="container">
                        <h2><i>Members</i></h2>
                        <div className="row overflow-auto">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Money</th>

                                </tr>
                                </thead>
                                <tbody>
                                {mems}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </MDBContainer>
        )
    }

    isAdmin() {
        return this.props.userId === 0
    }
}

export default Members;
