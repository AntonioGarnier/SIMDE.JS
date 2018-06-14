import React from 'react'
import PersonPin from 'material-ui/svg-icons/maps/person-pin'
import Info from 'material-ui/svg-icons/action/info'
import Group from 'material-ui/svg-icons/social/group'
import Code from 'material-ui/svg-icons/action/code'
import Problem from 'material-ui/svg-icons/action/extension'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Settings from 'material-ui/svg-icons/action/settings'
import Desktop from 'material-ui/svg-icons/hardware/desktop-windows'



export const sideBarElements = [
    {
        name: 'Personal Data',
        to: '/personal-data',
        leftIcon: <PersonPin />,
    },
    {
        name: 'Room List',
        to: '/room-list',
        leftIcon: <Group />,
    },
    {
        name: 'Group List',
        to: '/group-list',
        leftIcon: <GroupWork />,
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
        leftIcon: <PersonPin />,
    },
    {
        name: 'Room List',
        to: '/room-list',
        leftIcon: <Desktop />,
    },
    {
        name: 'Group List',
        to: '/group-list',
        leftIcon: <GroupWork />,
    },
    {
        name: 'Problem List',
        to: '/problem-list',
        leftIcon: <Problem />,
    },
    {
        name: 'Instance List',
        to: '/instance-list',
        leftIcon: <Code />,
    },
    {
        name: 'Problem Settings',
        to: '/problem-settings',
        leftIcon: <Settings />,
    },
    {
        name: 'Room Settings',
        to: '/room-settings',
        leftIcon: <Settings />,
    },
    {
        name: 'Group Settings',
        to: '/group-settings',
        leftIcon: <Settings />,
    },
    {
        name: 'Instance Settings',
        to: '/Instance-settings',
        leftIcon: <Settings />,
    },
    {
        name: 'About',
        to: '/about',
        leftIcon: <Info />,
    },
]

