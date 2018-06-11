import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'

const GenericList = (props) => {
    return (
        <div>
            {
                Object.keys(props.generic).map((id) => (
                        <ListItem
                            key={id}
                            leftIcon={props.generic[id].type === 'single' ? <Person/> : <Group/>}
                            onClick={() => props.handleOnClick(id)}
                        >
                            {props.generic[id].name}
                        </ListItem>
                ))
            }
        </div>
    )
}

GenericList.propTypes = {
    generic: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    handleOnClick: PropTypes.func.isRequired,
}

export default GenericList