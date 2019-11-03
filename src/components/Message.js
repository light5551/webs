import React from 'react';

class Message extends React.Component{
    render() {
        return (
            <div className="alert alert-secondary" role="alert">
                <strong>{this.props.author}: </strong>{this.props.message}
            </div>
        )
    }
}

export default Message;
