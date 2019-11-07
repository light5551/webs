import React from 'react';
import StockList from "./StockList";
import Members from "./Members";
import Messages from "./Messages";
import ProgressBar from "./ProgressBar";
import SaledStockList from "./SaledStockList";

class Content extends React.Component{
    saledList = [
        {
            id:1,
            company:'aa',
            count: 2
        }
    ]
    addSale()
    {

    }
    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="mr-auto ml-auto">
                            <StockList userId={this.props.userId}/>
                        </div>
                        {this.props.userId > 0 &&
                            <div className="mr-auto ml-auto">
                                <SaledStockList/>
                            </div>
                        }

                    </div>
                </div>


                <br/>
                <br/>
               <ProgressBar/>
                <br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="mr-auto ml-auto">
                            <Members userId={this.props.userId}/>
                        </div>

                        <div className="ml-auto mr-auto">
                            <Messages/>
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}

export default Content;
