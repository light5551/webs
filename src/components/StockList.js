import React from 'react';
import Stock from "./Stock";
import BasicComponent from '../ifaces/BasicComponent';

class StockList extends BasicComponent{

    constructor(props) {
        super(props,"http://localhost:4201/securities/");
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const res = await this.sendRequest()
        const data = await res.json()
        await this.setState({items: data})
    }

    render() {

        const scrollContainerStyle = {maxHeight: "600px" };
        const { error, isLoaded, items } = this.state;
        let stks = [];
        items.forEach(e => {
            stks.push(<Stock key={e.id} id={e.id} company={e.company} stockPrice={e.start_price} stockCount={e.number}
                             distribution={e.distribution} userId={this.props.userId}/>)})
        return (

            <div className="container border border-grey">
                <h2><i>Stocks</i></h2>
                <div className="row overflow-auto" style={scrollContainerStyle}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Company</th>
                            <th scope="col">Stocks Count</th>
                            <th scope="col">Distribution</th>
                            <th scope="col">Stock Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stks }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default StockList;
