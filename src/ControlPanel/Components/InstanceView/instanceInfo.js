import React from 'react'
import PropTypes from 'prop-types'


const InstanceInfo = ({
    name,
    initial,
    final,
    showFinal,
}) => {
    return (
        <div>
            <h3 style={{ fontWeight: 'bold' }} >
                {name}
            </h3>
            <h3 style={{ fontWeight: 'bold' }} >
                Initial state:
            </h3>
                <pre style={{ marginLeft: '15px', marginTop: '10px' }} >{initial}</pre>
            {
                showFinal
                ? <div>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Final state: 
                    </h3>
                        <pre style={{ marginLeft: '15px', marginTop: '10px' }} >{final}</pre>
                </div> 
                : null
            }
            
        </div>
    )
}

InstanceInfo.defaultProps = {
    showFinal: true,
}

InstanceInfo.propTypes = {
    name: PropTypes.string.isRequired,
    initial: PropTypes.string.isRequired,
    final: PropTypes.string.isRequired,
    showFinal: PropTypes.bool,
}

export default InstanceInfo