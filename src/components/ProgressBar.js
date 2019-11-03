import React from 'react';

class ProgressBar extends React.Component{
    render() {
        return (
            <div className="progress">
                <div className="progress-bar progress-bar-striped bg-dark some" role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        )
    }
}

export default ProgressBar;
