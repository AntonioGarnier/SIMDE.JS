import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'
import Problem from 'material-ui/svg-icons/action/extension'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Error from 'material-ui/svg-icons/alert/error'
import Code from 'material-ui/svg-icons/action/code'

const GenericList = (props) => {
    
    const selectIcon = (type) => {
        switch (type) {
            case 'singleRoom':
                return <Person/> 
            case 'groupRoom':
                return <Group/> 
            case 'problem':
                return <Problem/> 
            case 'group':
                return <GroupWork/> 
            case 'instance':
                return <Code/> 
            default:
                return <Error/> 
        }
    }

    return (
        <div>
            {
                props.genericOrdered.map((id) => (
                    props.generic.hasOwnProperty(id)
                        ? <ListItem
                            key={id}
                            leftIcon={selectIcon(props.type)}
                            onClick={() => props.handleOnClick(id)}
                        >
                            {props.generic[id].name}
                        </ListItem>
                        : null
                    
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
    genericOrdered: PropTypes.array.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}

export default GenericList