import React from 'react'
import Person from 'material-ui/svg-icons/social/person'
import Info from 'material-ui/svg-icons/action/info'
import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import PlayListAdd from 'material-ui/svg-icons/av/playlist-add'


const sideBarElements = [
    {
        name: 'Personal Data',
        to: '/personalData',
        leftIcon: <Person />,
    },
    {
        name: 'Problem List',
        to: '/problemList',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'Room List',
        to: '/roomList',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'Create Problem',
        to: '/createProblem',
        leftIcon: <PlayListAdd />,
    },
    {
        name: 'Create Room',
        to: '/createRoom',
        leftIcon: <PlayListAdd />,
    },
    {
        name: 'About',
        to: '/about',
        leftIcon: <Info />,
    },
]

export default sideBarElements
