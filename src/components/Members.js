import React from 'react';
import { MDBContainer, MDBScrollbar } from "mdbreact";
import Member from "./Member";

const members = [
    {
        id:0,
        name:'Mark',
        money:'500'
    },
    {
        id:1,
        name:'Tom',
        money:'540'
    },
    {
        id:2,
        name:'Alex',
        money:'100'
    },
    {
        id:3,
        name:'Sergey',
        money:'9999'
    },
    {
        id:4,
        name:'Yarik',
        money:'-100'
    },
]


class Members extends React.Component{
    render() {
        const scrollContainerStyle = { width: "500px", maxHeight: "600px" };
        let mems = [];
        members.forEach(e => {
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
