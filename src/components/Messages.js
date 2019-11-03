import React from 'react';
import Message from "./Message";

const messages = [
    {
        author: "user1",
        message: "la la la la la la lalalalalalalla"
    },
    {
        author: "user2",
        message: "kokokokokokokokokookokokokokokokoko"
    },
    {
        author: "user3",
        message: "aaaaaaaaaaaaaaaaaa"
    },
    {
        author: "user4",
        message: "oooooooooooooooooooooo"
    },
    {
        author: "user5",
        message: "dsadasdas"
    }
]


class Messages extends React.Component{
    render() {
        const scrollContainerStyle = { width: "500px", maxHeight: "300px" };

        let msgs = [];
        messages.forEach((e, index) => {
            msgs.push(<Message key={index} author={e.author} message={e.message}></Message>)
        });
        return (
            <div className="container">
                <h2><i>Messages</i></h2>
                <div className="overflow-auto" style={scrollContainerStyle}>
                    {msgs}
                </div>
            </div>

        )
    }
}

export default Messages;
