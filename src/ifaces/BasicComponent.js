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
        //console.log('URL: ' + this.url + dest + ', DATA == '+JSON.stringify(data), '----'+ opts.body)
        return await fetch(this.url + dest, opts)
            .catch(function(err, data) {
                console.log(err, data)
                console.log("error");
            });
    }

    async componentDidMount() {
      await this.Update();
        /*const res = await this.sendRequest()
        console.log(res);
        const data = await res.json();
        this.setState({items: data, isLoaded: true})
    */}

    async Update() {
        const res = await this.sendRequest()
        const data = await res.json()
        console.log('UPDATE URL:'+this.url + ' -- ' +JSON.stringify(data))
        await this.setState({items: data, isLoaded: true})
    }

}

export default BasicComponent;

