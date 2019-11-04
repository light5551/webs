import React from 'react';
import AddMemberModal from "./AddMemberModal";
import ExchangeOptionsModal from "./ExchangeOptionsModal";
import AddStockModal from "./AddStockModal";

class ModalsAPI extends React.Component{

  render() {
      return (
          <div>
              <AddMemberModal/>
              <ExchangeOptionsModal/>
              <AddStockModal/>
          </div>
      )
  }
}

export default ModalsAPI;

