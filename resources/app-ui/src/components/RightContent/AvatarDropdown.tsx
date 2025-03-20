import {LogoutOutlined, SettingOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history, useModel} from '@umijs/max';
import {message, Spin} from 'antd';
import {stringify} from 'querystring';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {request, Link} from '@umijs/max';

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarName = () => {
    const {initialState} = useModel('@@initialState');
    const {currentUser} = initialState || {};
    return (<span className="anticon">{currentUser?.name}</span>);
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu, children}) => {

    /**
     * sign out，and change the current url save
     */
    const loginOut = async () => {
        
        const {search, pathname} = window.location;
        const urlParams = new URL(window.location.href).searchParams;

    };

    const actionClassName = useEmotionCss(({token}) => {
        return {
            display: 'flex',
            height: '48px',
            marginLeft: 'auto',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0 8px',
            cursor: 'pointer',
            borderRadius: token.borderRadius,
            '&:hover': {
                backgroundColor: token.colorBgTextHover,
            },
        };
    });

    const {initialState, setInitialState} = useModel('@@initialState');

    const onMenuClick = useCallback(
        (event: MenuInfo) => {

            const {key} = event;
            if (key === 'logout') {

                request('/api/auth/logout', {
                    method: 'POST',
                    data: {},
                }).then(async (api_response) => {
                    console.log('logout = api_response');
                    console.log(api_response);

                    if (api_response.status) {

                      // Assuming you have obtained the token from your backend API response
                      localStorage.setItem('laravel_api_bearer_token', '');
                      window.location.href = '/authentication';

                    }

                }).catch(function (error) {
                    console.log(error);
                });

                return;
            }

            if (key === 'profile') {
                history.push('/' + initialState?.currentUser?.role + '-app/profile');
            }

            if( key == 'signup_login' ){
                history.push('/authentication');
            }

        },
        [setInitialState],
    );

    const loading = (
        <span className={actionClassName}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const {currentUser} = initialState;

    const menuItems = [
        ...(menu
            ? [
                {
                    key: 'center',
                    icon: <UserOutlined/>,
                    label: 'personal center',
                },
                {
                    key: 'settings',
                    icon: <SettingOutlined/>,
                    label: 'Personal settings',
                },
                {
                    type: 'divider' as const,
                },
            ]
            : []),
            ...( (currentUser) ?  [
        {
            key: 'profile',
            icon: <UserOutlined/>,
            label: 'Profile',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined/>,
            label: 'Log Out',
        },
    ] : [] ),
        ...( (!currentUser || !currentUser.name) ?  [
            { 
                key: 'signup_login', 
                icon: <LockOutlined/>, 
                label: 'Signup / Login', 
            }
        ] : [] )
    ];

    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
            {children}
        </HeaderDropdown>
    );
    
};
