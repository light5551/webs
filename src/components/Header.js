import React from 'react';
import ButtonHeader from "./ButtonHeader";
const NOBODY = -1;
const ADMIN = 0;

class Header extends React.Component{

    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal"><i><strong>S</strong>tock <strong>E</strong>xchange</i></h5>
                {this.getButtons()}
            </div>
        )
    }

    getButtons() {
        switch (this.props.userId) {
            case NOBODY:
                return ( <ButtonHeader name={'Log In'} />);
            case ADMIN:
                return(
                        <div className='row'>
                            <ButtonHeader name={'Add Member'} />
                            <ButtonHeader name={'Add Stock'}/>
                            <ButtonHeader name={'Exchange Options'}/>
                            <ButtonHeader update={this.props.update} name={'Log Out'} />
                        </div>
                );
            default:
                return(<ButtonHeader update={this.props.update} name={'Log Out'} />);

        }

    }
}

export default Header;
