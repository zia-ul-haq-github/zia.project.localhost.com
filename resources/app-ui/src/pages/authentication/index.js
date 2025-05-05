import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
    MailOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { history, request, SelectLang, useIntl, useModel, Helmet } from '@umijs/max';
import { Row, Col, Alert, message, Tabs } from 'antd';
import Settings from '../../../config/defaultSettings'; 
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        },
        main:{
            padding: '0px !important',
            margin: '10px'
        }
    };
});

const LoginMessage = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

const Login = () => {
    const [userLoginState, setUserLoginState] = useState({});
    const [type, setType] = useState('sign-in');
    const { initialState, setInitialState } = useModel('@@initialState');
    const { styles } = useStyles();
    // const { styles } = {}; // by zia
    const intl = useIntl();

    const fetchUserInfo = async () => {
      console.log('auth - fetchUserInfo');
        const userInfo = await initialState?.fetchUserInfo?.();
        console.log('auth - userInfo');
        console.log(userInfo);
        if (userInfo) {
            console.log('auth - userInfo - case - 01');
            flushSync(() => {
                console.log('auth - userInfo - case - 02');
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }else{
            console.log('auth - userInfo - case - 03');
        }
        console.log('auth - initialState');
        console.log(initialState);
    };

    const handleSubmit = async (values) => {
      console.log('handleSubmit');
      console.log('values');
      console.log(values);

        try {

              let logged_user_api_response = '';
            if( values?.name?.length > 0  ){

              /**
               *  Setup Static values
               */
              values.role = 'user';

              // register
                await request('/api/auth/register', {
                    method: 'POST',
                    data: values,
                }).then(async (api_response) => {
                    console.log('api_response');
                    console.log(api_response);
                
                    if (api_response?.status) {
                        logged_user_api_response = api_response;
                    }
                
                }).catch(function (error) {
                    console.log(error);
                });


            }else{

              // Log in
                await request('/api/auth/login', {
                    method: 'POST',
                    data: values,
                }).then(async (api_response) => {
                    console.log('api_response');
                    console.log(api_response);
                
                    if (api_response?.status) {
                        logged_user_api_response = api_response;
                    }
                
                }).catch(function (error) {
                    console.log(error);
                });

            }

            console.log('laravel_api_bearer_token');
            console.log(logged_user_api_response?.data?.access_token?.text);

          // Assuming you have obtained the token from your backend API response
          localStorage.setItem('laravel_api_bearer_token', logged_user_api_response?.data?.access_token?.text);

        //   flushSync(() => {
            // setInitialState((s) => ({
            // setInitialState((s) => ({
            //   ...s,
            //   zia_test: logged_user_api_response?.data?.user,
            //   currentUser: logged_user_api_response?.data?.user,
            // }));
        //   });

        console.log('after - redirect - logged_user_api_response?.data?.user');
        console.log(logged_user_api_response?.data?.user);

        // Set refresh flag in the global state
      setInitialState({ ...initialState, currentUser: logged_user_api_response?.data?.user, refresh: () => {return true;} });

          // Set user error message if failed
          //   setUserLoginState(logged_user_api_response);

          console.log('before - redirect - initialState');
            console.log(initialState);

          if (logged_user_api_response.status === true) {
            window.location =  '/' + logged_user_api_response?.data?.user?.role + '-app/dashboard';
            return;
          }else{
            history.push('/authentication');
            return;
          }




        } catch (error) {
            const defaultLoginFailureMessage = 'Login failed, please try again!';
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };
    const { status, type: loginType } = userLoginState;

    return (
        <div className={styles?.container}>
            <Helmet>
                <title>
                    {Settings.title}
                </title>
            </Helmet>
            <div
                style={{
                    flex: '1',
                    // padding: '32px 0',
                }}
            >
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src={initialState?.settings?.logo} />}
                    title="Online Tutor Finding Application"
                    subTitle='Your ultimate online tutor finding application.'
                    onFinish={async (values) => {
                        await handleSubmit(values);
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={setType}
                        centered
                        items={[
                            {
                                key: 'sign-in',
                                label: 'Sign in',
                            },
                            {
                                key: 'sign-up',
                                label: 'Sign Up',
                            },
                        ]}
                    />

                    {status === 'error' && loginType === 'sign-in' && (
                        <LoginMessage
                            content='Wrong username or password'
                        />
                    )}
                    {type === 'sign-in' && (
                        <>
                            <ProFormText
                                name="email"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MailOutlined />,
                                }}
                                placeholder='zia@example.com'
                                rules={[
                                    {
                                        required: true,
                                        message: ("please enter user name!"),
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                    max: 10,
                                    min: 6,
                                }}
                                placeholder='Type password'
                                rules={[
                                    {
                                        required: true,
                                        message: ("Please enter your password!"),
                                    },
                                ]}
                            />
                        </>
                    )}

                    {status === 'error' && loginType === 'sign-up' && <LoginMessage content="Verification code error" />}
                    {type === 'sign-up' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined />,
                                }}
                                name="name"
                                placeholder='Enter Full Name'
                                rules={[
                                    {
                                        required: true,
                                        message: ("Please enter name!"),
                                    }
                                ]}
                            />
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MailOutlined />,
                                }}
                                name="email"
                                placeholder='Enter your Email'
                                rules={[
                                    {
                                        required: true,
                                        message: ("Please enter email!"),
                                    }
                                ]}
                            />
                            <ProFormText.Password
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                    max: 10,
                                    min: 6,
                                }}
                                name="password"
                                placeholder='Enter Password'
                                rules={[
                                    {
                                        required: true,
                                        message: ("Please enter password!"),
                                    }
                                ]}
                            />
                          <ProFormText.Password
                            name="password_confirmation"
                            dependencies={['password']}
                            fieldProps={{
                              size: 'large',
                              prefix: <LockOutlined />,
                              max: 10,
                              min: 6,
                            }}
                            placeholder='Enter Confirm Password'
                            rules={[
                              {
                                required: true,
                                message: 'Please confirm your password!',
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                              }),
                            ]}
                          />
                        </>
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                    </div>
                </LoginForm>
            </div>
        </div>
    );
};

export default Login;
