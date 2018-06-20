import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import One from 'material-ui/svg-icons/image/looks-one'
import Two from 'material-ui/svg-icons/image/looks-two'
import Three from 'material-ui/svg-icons/image/looks-3'
import MoodBad from 'material-ui/svg-icons/social/mood-bad'
import { List, ListItem } from 'material-ui/List'
import { Menu } from 'material-ui/Menu'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import {
    openSnackBar,
    openPopUp,
    closeSideBarRank,
} from '../../Actions'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
        closeSideBarRank,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        userList: state.controlPanel.userList,
        groups: state.controlPanel.groups,
        toggleSideBarRank: state.controlPanel.toggleSideBarRank,
    }
}

const RankingView = (props) => {
    const getRightIcon = (index) => {
        switch (index) {
        case 0: 
            return <One />
        case 1: 
            return <Two />
        case 2: 
            return <Three />
        default:
            return <MoodBad />
        }
    }
    const rankingOrdered = Object.keys(props.scores).sort((a , b) => props.scores[b]-props.scores[a])
    return (
        <Drawer
            containerStyle={{ top: '64px'}}
            open={props.toggleSideBarRank}
            zDepth={0}
            openSecondary
            docked
            width={350}
        >
            <AppBar
                title="Ranking"
                showMenuIconButton
                onLeftIconButtonClick={props.closeSideBarRank}
            />
            <Menu>
                <List>
                    { 
                        rankingOrdered.every(id => props.type === 'single' ? props.userList.hasOwnProperty(id) : props.groups.hasOwnProperty(id) && props.userList.hasOwnProperty(props.groups[id].leader))
                        ? rankingOrdered.map((id, index) => (
                            <ListItem
                                style={{ width: '350px' }}
                                key={id}
                                disabled
                                primaryText={ props.type === 'single' ? props.userList[id].name : props.groups[id].name }
                                secondaryText={`Score - ${props.scores[id]}`}
                                leftAvatar={<Avatar src={props.type === 'single' ? props.userList[id].picture : props.userList[props.groups[id].leader].picture} />}
                                rightIcon={getRightIcon(index)}
                            />
                        ))
                        : null
                    }
                </List>
            </Menu>
        </Drawer>     
    )
}

RankingView.propTypes = {
    type: PropTypes.string.isRequired,
    scores: PropTypes.objectOf(PropTypes.number).isRequired,
    closeSideBarRank: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingView)