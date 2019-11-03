import React from 'react';
import StockList from "./StockList";
import Members from "./Members";
import Messages from "./Messages";
import ProgressBar from "./ProgressBar";

class Content extends React.Component{
    render() {
        return (
            <div>
                    <StockList></StockList>
                <br/>
                <br/>
               <ProgressBar></ProgressBar>
                <br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="mr-auto ml-auto">
                            <Members></Members>
                        </div>

                        <div className="ml-auto mr-auto">
                            <Messages></Messages>
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}

export default Content;
