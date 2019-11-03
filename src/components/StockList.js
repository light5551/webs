import React from 'react';
import Stock from "./Stock";

const stocks = [
    {
        id:0,
        company:'Company1',
        stockCount:'500',
        distribution: 'Normal',
        stockPrice: '100'
    },
    {
        id:1,
        company:'Company2',
        stockCount:'100',
        distribution: 'Pois',
        stockPrice: '150'
    },
    {
        id:2,
        company:'Company3',
        stockCount:'200',
        distribution: 'Binom',
        stockPrice: '150'
    },
    {
        id:3,
        company:'Company2',
        stockCount:'100',
        distribution: 'Uniform',
        stockPrice: '150'
    }
]



class StockList extends React.Component{
    render() {

        const scrollContainerStyle = {maxHeight: "600px" };
        let stks = [];
        stocks.forEach(e => {
            stks.push(<Stock key={e.id} id={e.id} company={e.company} stockPrice={e.stockPrice} stockCount={e.stockCount}
    distribution={e.distribution}/>)
        });
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
                        {stks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default StockList;
