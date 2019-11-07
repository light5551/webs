import React from 'react';

const Colours = {
    green: 'success',
    red: 'danger',
    yellow: 'warning'
}

class SpecialButton extends React.Component{
    render() {
        return (
            <button type="button" className={"btn btn-" + Colours[this.props.colour]}  data-toggle="modal"
                    data-target={'#' +this.props.name} onClick={this.props.fun}>
                {this.props.children}
            </button>
        )
    }
}

export default SpecialButton;
