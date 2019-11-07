import React from 'react';
import AddMemberModal from "./AddMemberModal";
import ExchangeOptionsModal from "./ExchangeOptionsModal";
import AddStockModal from "./AddStockModal";
import LogInModal from "./LogInModal";
import EditStockModal from "./EditStockModal";

class ModalsAPI extends React.Component{

  render() {
      return (
          <div>
              <AddMemberModal/>
              <ExchangeOptionsModal/>
              <AddStockModal/>
              <LogInModal update={this.props.update}/>
              <EditStockModal/>
          </div>
      )
  }
}

export default ModalsAPI;

