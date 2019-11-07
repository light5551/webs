import React from 'react';

class InputModal extends React.Component{

    render() {
        return (
                <div>
                    <label htmlFor={this.props.id}>{this.props.children}</label>
                    <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.ph} defaultValue={this.props.value} max={this.props.max}/>
                </div>
        )
    }
}

export default InputModal;
