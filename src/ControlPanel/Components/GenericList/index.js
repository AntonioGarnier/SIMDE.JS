import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'
import Work from 'material-ui/svg-icons/action/work'
import GroupWork from 'material-ui/svg-icons/action/group-work'


const GenericList = (props) => {
    
    const selectIcon = (type) => {
        switch (type) {
            case 'singleRoom':
                return <Person/> 
            case 'groupRoom':
                return <Group/> 
            case 'problem':
                return <Work/> 
            case 'group':
                return <GroupWork/> 
            default:
                return <Person/> 
        }
    }

    return (
        <div>
            {
                Object.keys(props.generic).map((id) => (
                        <ListItem
                            key={id}
                            leftIcon={selectIcon(props.type)}
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
        }).isRequired,
    ).isRequired,
    handleOnClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}

export default GenericList