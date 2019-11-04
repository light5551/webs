import React from 'react';

class ModalTemplate extends React.Component{
    static defaultProps = {
        save_text: 'Save Changes'
    }

    constructor(props)
    {
        super(props);
    }

    render() {

        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog"
                 aria-labelledby={this.props.id} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><i>{this.props.title}</i></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.fun}>{this.props.save_text}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalTemplate;
