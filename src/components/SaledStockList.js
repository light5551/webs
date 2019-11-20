import React from 'react';
import SaledStock from "./SaledStock";
import BasicComponent from "../ifaces/BasicComponent";

class SaledStockList extends BasicComponent{

    constructor(props) {
        super(props, "http://localhost:4201/users/stock" + props.userId)
        this.saledStocks = [{id:1, company:'aa', count:5}]
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (localStorage.updateSaledStockList === "true")
        {
            const res = await this.sendRequest()
            const data = await res.json()
            localStorage.updateSaledStockList = false;
            await this.setState({items: data})
        }

    }

    render() {
        const { error, isLoaded, items } = this.state;
        let stks = [];
        items.forEach(e => {
            stks.push(<SaledStock userId={this.props.userId} key={e.id} id={e.id} company={e.company} count={e.number} update={this.props.update}/>)})
        return (
            <div className="container border border-grey">
                <h2><i>Your Stocks</i></h2>
                <div className="row overflow-auto">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Company</th>
                            <th scope="col">Stocks Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SaledStockList;
