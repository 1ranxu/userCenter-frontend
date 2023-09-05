import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constants";

const Register: React.FC = () => {
    const [type, setType] = useState<string>('account');
    const handleSubmit = async (values: API.RegisterParams) => {
        // 校验
        const {userPassword, checkPassword} = values;
        if (userPassword !== checkPassword) {
            message.error('两次输入的密码不一致，请重试！');
            return;
        }
        try {
            // 注册
            const id = await register(values);
            if (id) {
                const defaultRegisterSuccessMessage = '注册成功！';
                message.success(defaultRegisterSuccessMessage);
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const {query} = history.location;
                history.push({
                    pathname: '/user/login',
                    query
                });
                return;
            }
        } catch (error: any) {
            const defaultRegisterFailureMessage = '注册失败，请重试！';
            message.error(defaultRegisterFailureMessage);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LoginForm
                    submitter={{
                        searchConfig: {submitText: '注册'}
                    }}
                    logo={<img alt="logo" src={SYSTEM_LOGO}/>}
                    title="编程空间"
                    subTitle={<
                        a href={"https://github.com"} target={"_blank"} rel="noreferrer">最好的编程学习圈子</a>}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane key="account" tab={'账号密码注册'}/>
                    </Tabs>
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={'请输入账号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '账号是必填项！',
                                    },
                                    {
                                        min: 4,
                                        type: "string",
                                        message: '账号长度不能小于4位！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={'请输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        type: "string",
                                        message: '密码长度不能小于8位！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="checkPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={'请输入二次密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '二次密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        type: "string",
                                        message: '二次密码长度不能小于8位！',
                                    },
                                ]}
                            />
                            <ProFormText
                                name="authCode"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={'请输入权限编号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '权限编号是必填项！',
                                    },
                                    {
                                        min: 1,
                                        type: "string",
                                        message: '权限编号长度不大于5位！',
                                    },
                                ]}
                            />
                        </>
                    )}
                </LoginForm>
            </div>
            <Footer/>
        </div>
    );
};
export default Register;
