import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, FormInstance, Modal, Spin, message } from 'antd';
import { Button, Form, Input } from 'antd';
import styles from './style/index.module.less';
import { getCaptcha ,frontLogin} from '@/network/api/api';
import { useUserStore } from '@/store/user';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const [count, setCount] = useState(60);
  const [isCountDown, setIsCountDown] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const {userInfo,setUserInfo} = useUserStore()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const res = await formRef.current?.validateFields();
    if(res){
      setLoginLoading(true)
      try{
        const userInfo = await frontLogin(res)
        message.success('登录成功')
        setUserInfo(userInfo)
        setIsModalOpen(false);
      }finally{
        setLoginLoading(false)

      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const validator = (_: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error('请输入手机号'));
    } else if (!/^1[3456789]\d{9}$/.test(value)) {
      return Promise.reject(new Error('请输入正确的手机号'));
    } else {
      return Promise.resolve();
    }
  };

  const timerRef = useRef<NodeJS.Timer | null>(null);

  const sendCode = async () => {
    if(isCountDown||codeLoading) return
    const res = await formRef.current?.validateFields(['phone']);
    if (res) {
      setCodeLoading(true)
      try {
        const data = await getCaptcha({ phone: res.phone });
        if (data.code === 'OK') {
          setIsCountDown(true);
          timerRef.current = setInterval(() => {
            setCount((count) => {
              if (count === 0) {
                clearInterval(timerRef.current!);
                setIsCountDown(false);
                return 60;
              } else {
                return count - 1;
              }
            });
          }, 1000);
        }
      } finally{
        setCodeLoading(false)
      }
    }
  };

  const handleLogout = () => {
    setUserInfo({})
  }

  const items = [
    {
      key:1,
      label:<div className='text-center' onClick={handleLogout}>退出</div>
    }
  ]


  const githubClick = () => {
   window.location.href =
    'https://github.com/login/oauth/authorize?client_id=c3bb839b00cd0a02b239&redirect_uri=http://127.0.0.1:8090/user/github/login&state=785895&scope=user'
  }

  useEffect(() => {
    if (!isModalOpen) {
      clearInterval(timerRef.current!);
      setIsCountDown(false);
      setCount(60);
    }
  }, [isModalOpen]);
  return (
    
      <div className=' ml-20'>
        {userInfo.id?
         <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className={`${styles.userInfo} flex items-center cursor-pointer`}>
          <img src="/assets/images/boy.jpeg" alt=""/>
          <span>{userInfo.username}</span>
        </div>
       </Dropdown>
       
        :
        <Button onClick={showModal} style={{background:"#fff"}}>登录</Button>}
        <Modal
        title={<div className="text-center">登录</div>}
        onCancel={handleCancel}
        width={400}
        destroyOnClose
        open={isModalOpen}
        footer={null}
        centered
        getContainer={false}
      >
        <Form className="login-form" ref={formRef}>
          <Form.Item name="phone" rules={[{ validator: validator }]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <div className="flex">
              <Input placeholder="请输入验证码" />
              <div onClick={sendCode} className={`${styles.code} border rounded whitespace-nowrap`}>
                {!isCountDown ?codeLoading?<Spin></Spin>: '获取验证码' : count}
              </div>
            </div>
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" onClick={handleOk} block loading={loginLoading}>
              登录
            </Button>
          </Form.Item>
          <div className="flex justify-center gap-4">
            <i className={`iconfont icon-github ${styles.icons}`} onClick={githubClick}></i>
            <i className={`iconfont icon-weixin ${styles.icons}`}></i>
            {/* <i className={`iconfont icon-QQ ${styles.icons}`}></i> */}
          </div>
        </Form>
      </Modal>
      </div>
      
    
  );
}
