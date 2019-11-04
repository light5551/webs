import React from 'react';
import { MDBContainer, MDBScrollbar } from "mdbreact";
import Member from "./Member";
import BasicComponent from "../ifaces/BasicComponent";

class Members extends BasicComponent{

    constructor(props) {
        super(props, "http://localhost:4201/members/");

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const res = await this.sendRequest()
        const data = await res.json()
        this.setState({items: data})
    }

    render() {
        const scrollContainerStyle = { width: "500px", maxHeight: "600px" };
        const { error, isLoaded, items } = this.state;
        let mems = [];
        items.forEach(e => {
            mems.push(<Member key={e.id} id={e.id} name={e.name} money={e.money}></Member>)
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
}

export default Members;
