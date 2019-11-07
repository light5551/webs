import React from 'react';
import Stock from "./Stock";
import SaledStock from "./SaledStock";

class SaledStockList extends React.Component{
    propsDefault = {
        id: 0
    }

    constructor(props) {
        super(props)
        this.saledStocks = [{id:1, company:'aa', count:5}]
    }
    render() {
        let stks = []
        //if (this.props.id)
        //    this.saledStocks.push({id:this.props.id, company: this.props.company, count: this.props.count})
        this.saledStocks.forEach(e => {
            stks.push(<SaledStock key={e.id} id={e.id} company={e.company} count={e.count} />)})
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
