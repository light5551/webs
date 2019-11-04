import React from 'react';

class ButtonHeader extends React.Component{
    render() {
        let name = '#' +this.props.name.toString().split(' ').join('');
        console.log(name)
        return (
                <nav className="my-2 my-md-0 mr-md-3">
                    <button className="btn btn-outline-secondary"
                            data-toggle="modal" data-target={'#' +this.props.name.toString().split(' ').join('')}>
                        {this.props.name}
                    </button>
                </nav>
        )
    }
}

export default ButtonHeader;
