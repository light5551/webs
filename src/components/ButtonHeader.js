import React from 'react';

class ButtonHeader extends React.Component{
    render() {
        let name = '#' +this.props.name.toString().split(' ').join('');
        console.log(name)
        let button = (<button className="btn btn-outline-secondary"
                              data-toggle="modal" data-target={'#' +this.props.name.toString().split(' ').join('')}>
            {this.props.name}
        </button>);
        if (this.props.name === 'Log Out')
            button = (<button className="btn btn-danger" onClick={() => {this.props.update('-1')}}>
                {this.props.name}
            </button>);
        return (
                <nav className="my-2 my-md-0 mr-md-3">
                    {button}
                </nav>
        )
    }
}

export default ButtonHeader;
