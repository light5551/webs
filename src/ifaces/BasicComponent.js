import React from 'react';

class BasicComponent extends React.Component{

    constructor(props, url) {
        super(props);
        this.url = url;
        this.httpOpts = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        const res = await fetch(this.url, this.httpOpts)
            .catch(function() {
                console.log("error");
            });
        const data = await res.json();
        this.setState({items: data, isLoaded: true})
    }
}

export default BasicComponent;

