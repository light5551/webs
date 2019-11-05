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

    async sendRequest(data = null, method = "GET", dest = "")
    {
        let opts = this.httpOpts;
        if(data)
            opts.body = JSON.stringify(data);
        opts.method = method;
        return await fetch(this.url + dest, opts)
            .catch(function() {
                console.log("error");
            });
    }

    async componentDidMount() {
        const res = await this.sendRequest()
        console.log(res);
        const data = await res.json();
        this.setState({items: data, isLoaded: true})
    }

}

export default BasicComponent;

