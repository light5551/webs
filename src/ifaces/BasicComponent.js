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
        else
            opts.body = null;
        opts.method = method;
        console.log('DATA == '+data, '----'+ opts.body)
        return await fetch(this.url + dest, opts)
            .catch(function(err, data) {
                console.log(err, data)
                console.log("error");
            });
    }

    async componentDidMount() {
      this.Update();
        /*const res = await this.sendRequest()
        console.log(res);
        const data = await res.json();
        this.setState({items: data, isLoaded: true})
    */}

    async Update() {
        const res = await this.sendRequest()
        console.log('URL:'+this.url + ' -- ' +res)
        console.log(res.body)
        const data = await res.json()
        await this.setState({items: data, isLoaded: true})
    }

}

export default BasicComponent;

