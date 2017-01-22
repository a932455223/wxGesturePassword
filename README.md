## 微信小程序上的手势密码插件
### example
![示例图片](http://7xt768.com1.z0.glb.clouddn.com/gesturePassword_66398b21ab7100c4b8bc845aa7508c92.gif)

#### 说明
这是一个基于 微信小程序提供的 `canvas` api写的手势密码的demo 。此外还有一个 运行在 `web`页面上的 [js版本](https://github.com/a932455223/gesturePassword) 方便大家使用。

### 特点
1.解锁样式可以配置
2.功能全面

### 配置样式
目录下 `utils/config`下为配置文件。
配置文件中的
- `circle`对应图片中的空心圆环。
- `line`对应手势滑动过程中的线条。
- `dot` 对应选中状态下中间的圆点

配置文件中的`wrong`和`right`分别对应判定为 `错误` 和 `正确` 时的样式。上图gif对应 `config` 文件夹下的 `darkConfig.js` 文件。下图的 gif 则对应 `lightConfig.js` 文件。

![示例图片](http://7xt768.com1.z0.glb.clouddn.com/lightPassword_b79ab25b2b8611ae58027a4b1a379f17.gif)
