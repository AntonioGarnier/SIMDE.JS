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
            containerStyle={{ top: '64px', backgroundColor: 'white', borderStyle: 'solid', borderWidth: '0px 0px 0px 1px', borderColor: 'rgb(229, 226, 226)'}}
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
                        rankingOrdered.length > 0
                        ? rankingOrdered.map((id, index) => (
                            <ListItem
                                style={{ width: '350px' }}
                                key={id}
                                disabled
                                primaryText={ props.type === 'single' ? props.userList[id].name : props.groups[id].name }
                                secondaryText={`Score - ${parseFloat(parseFloat(props.scores[id]).toFixed(2))}`}
                                leftAvatar={<Avatar src={props.type === 'single' ? props.userList[id].picture : props.userList[props.groups[id].leader].picture} />}
                                rightIcon={getRightIcon(index)}
                            />
                        ))
                        : <div><p style={{ textAlign: 'center', width: '350px' }} >No results to display yet</p><img width="350px" src="https://www.meme-arsenal.com/memes/4c1c668ed999b5525ca0cb0484b22b18.jpg" alt="AuthorSign:)" /></div>
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