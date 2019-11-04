import React from 'react';

class Message extends React.Component{
    render() {
        return (
            <div className="alert alert-primary" role="alert">
                <strong>{this.props.author}: </strong>{this.props.message}
            </div>
        )
    }
}

export default Message;
