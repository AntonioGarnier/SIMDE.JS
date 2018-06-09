import React from 'react'
import Person from 'material-ui/svg-icons/social/person'
import Info from 'material-ui/svg-icons/action/info'
import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import PlayListAdd from 'material-ui/svg-icons/av/playlist-add'


export const sideBarElements = [
    {
        name: 'Personal Data',
        to: '/personal-data',
        leftIcon: <Person />,
    },
    {
        name: 'Room List',
        to: '/room-list',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'Group List',
        to: '/group-list',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'About',
        to: '/about',
        leftIcon: <Info />,
    },
]

export const sideBarElementsAdmin = [
    {
        name: 'Personal Data',
        to: '/personal-data',
        leftIcon: <Person />,
    },
    {
        name: 'Room List',
        to: '/room-list',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'Group List',
        to: '/group-list',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'Problem List',
        to: '/problem-list',
        leftIcon: <FormatListBulleted />,
    },
    {
        name: 'Problem Settings',
        to: '/problem-settings',
        leftIcon: <PlayListAdd />,
    },
    {
        name: 'Room Settings',
        to: '/room-settings',
        leftIcon: <PlayListAdd />,
    },
    {
        name: 'Group Settings',
        to: '/group-settings',
        leftIcon: <PlayListAdd />,
    },
    {
        name: 'About',
        to: '/about',
        leftIcon: <Info />,
    },
]

