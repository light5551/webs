import React from 'react';

class InputModal extends React.Component{
    static defaultProps = {
        ph: ''
    }

    render() {
        return (
                <div>
                    <label htmlFor={this.props.id}>{this.props.children}</label>
                    <input className="form-control" id={this.props.id} placeholder={this.props.ph} />
                </div>
        )
    }
}

export default InputModal;
