import React, { Component } from 'react';
import './LoginMain.less';
import { Button, Input, Form, Icon, message } from 'antd';
import { backgroud1, backgroud2, backgroud3, rightArrow, leftArrow } from '../Image/index';

const PIC = [backgroud1, backgroud2, backgroud3];
const { Password } = Input;

/**
 * 登录主页面
 */
class LoginMainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosItem: 0, //0:登录 1：注册
      picIndex: 0    //背景图片的索引
    };
  }

  /**
   * 验证输入的内容
   */
  _makeSureInput = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._judgeLoginInfo(values);
      }
    });
  }

  /**
   * 验证账号密码是否正确
   * @param {object} values  {username,password} 
   */
  _judgeLoginInfo = (values) => {
    //具体校验规则后期搭建数据库和后台后再搞
    if (!values || !values.username || !values.password) {
      return;
    }
    if (values.username !== "admin") {
      message.error('该账号不存在');
      return;
    }
    if (values.password !== "admin") {
      message.error('密码错误');
      return;
    }
  }


  /**
   * 切换背景图
   * @param {Boolean} isLeft 是否左切 
   */
  _changeBackgroud = (isLeft) => {
    const { picIndex } = this.state;
    let indexNew = picIndex;
    if (isLeft) {
      indexNew = Math.abs(picIndex + 3 - 1) % 3;
    } else {
      indexNew = Math.abs(picIndex + 1) % 3;
    }
    this.setState({
      picIndex: indexNew
    })
  }

  render() {
    const { choosItem, picIndex } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (<div className="loginMain_main" >
      <div className="loginMain_main_top">
        <div className="loginMain_main_top_icon"></div>
        <span>Amour</span>
        <h1>世界因你而改变</h1>
        <a style={{ color: '#00bbee' }}>登录</a>
        <a>注册</a>
      </div>
      <div className="loginMain_main_background" style={{ background: `url(${PIC[picIndex]})`, backgroundSize: '100% 100%' }} />
      <div className="loginMain_main_leftArrow" onClick={() => this._changeBackgroud(true)} />
      <div className="loginMain_main_rightArrow" onClick={() => this._changeBackgroud(false)} />
      <div className="loginMain_main_center">
        <Form className="loginMain_main_center_div">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号' }]
            })(
              <Input
                autoComplete="off"
                placeholder="用户名/账号"
                prefix={<Icon style={{ color: 'rgba(0,0,0,.55)' }}
                  type="user"
                />}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Password
                autoComplete="off"
                placeholder="密码"
                prefix={<Icon style={{ color: 'rgba(0,0,0,.55)' }}
                  type="lock"
                />}
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this._makeSureInput} >登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>);
  }
}

const LoginMain = Form.create()(LoginMainForm);
export default LoginMain;