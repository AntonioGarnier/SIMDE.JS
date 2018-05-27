import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'


const Loading = () => {
    return (
        <div
            className="fullScreen"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <CircularProgress
                size={300}
                thickness={10}
            />
        </div>
    )
}

export default Loading
