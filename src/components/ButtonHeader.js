import React from 'react';

class ButtonHeader extends React.Component{
    render() {
        return (
                <nav className="my-2 my-md-0 mr-md-3">
                    <button className="btn btn-outline-secondary" onClick={event => console.log(event.target.innerHTML)}>
                        {this.props.name}
                    </button>
                </nav>
        )
    }
}

export default ButtonHeader;
