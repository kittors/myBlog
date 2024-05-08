# GitHub的WebHooks的使用
>
> 作者：[程序员Kittors](https://github.com/kittors)
>
> 本站地址：[https://blog.07230805.xyz](https://blog.07230805.xyz)


## 文章大致内容
本篇文章主要简单介绍了下GitHub的WebHooks的应用，主要内容包括了

- WebHooks的介绍
- 我使用WebHooks的目的
- debian系统下相关的库的安装
- debian系统下的GitHub 的SSH配置
- 使用python以及Flask框架开发简单的WebHooks接口
- 如何在debian系统下使用webhook

## WebHooks的介绍
简单来说WebHooks是一种基于HTTP的回调函数，在指定的HTTP通信返回信息的时候执行特定的方法，是用于两个应用API之间的轻量通讯工具，从而实现特定的自动化行为。

## 我使用WebHooks的目的
在最开始的学习编程的时候，我还是一个纯前端程序员，每次写完一个web应用，到部署的时候，都需要自己去打包web应用，然后ssh链接服务器，去将对应的文件拷贝到nginx服务器指定的web应用路径下。这样的操作十分的繁琐。

有没有什么方法可以自动化完成类似的一系列工作呢。随着编程学习的加深，慢慢就接触到了WebHooks，这样的功能岂不是就能完美实现我曾经遐想的自动化部署操作。

## debian系统下相关的库的安装

1.更新软件包列表：
```Shell 
sudo apt update
```

2.安装Python3和pip3：
```Shell 
sudo apt install python3 python3-pip
```

3.验证Python安装是否成功：

```Shell
python3 --version
```

4.验证pip安装是否成功：

```Shell
pip3 --version
```

5.安装Flask模块：

```Shell
pip3 install flask
```

6.安装Git软件包：

```Shell
sudo apt install git
```

7.运行以下命令查看Git的版本信息：

```Shell
git --version
```

8.确保安装了curl

```Shell
sudo apt-get install -y curl
```

9.安装 Node.js 16.x版本的Node（vuePress的项目 可以正常运行在16.20.1，别的node可能会出现打包问题）

```Shell
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

10.安装Node.js v16.20.1：

```Shell
sudo apt-get install -y nodejs
```

11.验证安装：
安装完成后，验证Node.js和npm是否正确安装：

```Shell
node -v
npm -v
```

## debian系统下的GitHub 的SSH配置

### 前提
webhook的使用，服务器端全部是在debian系统下做演示，其他的linux发行版可以参考这些操作。

远程仓库使用github

#### 这是我的debian系统

```shell 
------------------------
系统版本: Debian GNU/Linux 11 (bullseye)
Linux版本: 5.10.0-26-amd64
------------------------
```

### SSH key 配置
因为我们想在debian系统下可以正常的clone自己的仓库，如果自己的仓库是私有仓库，建议通过SSH的方式进行clone会更加的安全。所以我们需要在github上添加一个自己的服务器生成的`SSH key`才可以

#### 服务器端生成SSH key
在自己的debian 系统下

如果自己已经在当前的系统下生成过`SSH key`
可以通过以下的命令查询
```Shell 
ls ~/.ssh
```

如果并不存在SSH密钥对，可以运行以下命令来生成新的SSH密钥对：
```Shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
在运行上面的命令的时候，需要按照要求和选项进行配置，我都是用默认的配置，运行的过程如下

![](https://github.com/kittors/picx-images-hosting/raw/master/image.7i073nwh8w.webp)

完成密钥生成后，运行以下命令显示公钥内容：
```Shell 
cat ~/.ssh/id_rsa.pub
```

复制整个公钥内容。

#### 可能出现的问题
当在第一次通过SSH克隆GitHub仓库时，会出现提示以确认GitHub服务器的身份验证。
```Shell
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ECDSA key fingerprint is SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM.
```
您可以通过以下方法解决该问题：

如果确定指纹是正确的，可以将该指纹添加到~/.ssh/known_hosts文件中。在终端中运行以下命令，将指纹添加到known_hosts文件中：
```Shell
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

#### 在GitHub上添加SSH key

1.登录到GitHub账户，然后点击右上角的个人头像，选择"Settings"。
![](https://github.com/kittors/picx-images-hosting/raw/master/image.1seus363xs.webp)
2.在左侧导航栏中，选择"SSH and GPG keys"。
![](https://github.com/kittors/picx-images-hosting/raw/master/image.lvx6p94d.webp)
3.点击"New SSH key"按钮。

4.在"Title"字段中，为该SSH密钥添加一个描述性的名称。

5.在"Key"字段中，粘贴您复制的公钥内容。
![](https://github.com/kittors/picx-images-hosting/raw/master/image.491370gk4z.webp)

接下来你可以尝试在你的服务器通过SSH的方式 clone 你的github上的某个仓库，如果成功了就说明操作成功了（记得安装git命令哦，使用git clone）

## 使用python以及Flask框架开发简单的WebHooks接口

这是我使用了flask开发的接口，依赖python3环境
当用户将代码push到主分支后实现部署web服务的一些列操作

```Python 
from flask import Flask, request
import subprocess
import shutil
import os

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    if data['ref'] == 'refs/heads/main' and data['after'] != '0000000000000000000000000000000000000000':
        print("已经push到main分支，开始执行部署脚本")
        try:
            deploy()
        except Exception as e:
            print(f"部署脚本执行失败：{str(e)}")
    return 'Webhook received successfully'

def deploy():
    # 检查并删除现有的/home/build目录
    if os.path.exists('/home/build') and os.path.isdir('/home/build'):
        shutil.rmtree('/home/build')
        print("已存在的/home/build目录已被删除")

    clone_command = ['git', 'clone', 'git@github.com:kittors/myBlog.git', '/home/build']
    try:
        subprocess.run(clone_command, check=True)
        print("clone完成")

        # 进入/home/build文件夹
        os.chdir('/home/build')

        # 使用npm install安装所有依赖
        npm_install = ['npm', 'install', '--registry=https://registry.npmmirror.com']
        subprocess.run(npm_install, check=True)
        print("依赖安装完成")

        # 执行npm run docs:build
        npm_build = ['npm', 'run', 'docs:build']
        subprocess.run(npm_build, check=True)
        print("打包完成")

        # 删除/home/web/html/blog.07230805.xyz内的所有文件
        shutil.rmtree('/home/web/html/blog.07230805.xyz', ignore_errors=True)

        # 将当前文件夹下.vuepress/dist的文件复制到/home/web/html/blog.07230805.xyz
        shutil.copytree('/home/build/.vuepress/dist', '/home/web/html/blog.07230805.xyz')

        # 复制完成后删除/home/build文件
        shutil.rmtree('/home/build')

    except subprocess.CalledProcessError as e:
        print(f"操作失败：{str(e)}")

    # 回到根目录
    os.chdir('/')
    print("已回到根目录")



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

```

## 如何在debian系统下使用webhook

### github仓库页面配置

先进入自己的一个仓库
我用我的博客仓库作为用例，来进行操作
在的你当前仓库找到 `Settings` 入口，点击进入仓库设置页面，在设置页你可以找到一个叫`Webhooks`功能菜单，在该菜单下点击`Add webhook`添加一个新的 webhook

![](https://github.com/kittors/picx-images-hosting/raw/master/image.6ik3qh4h39.webp)

添加`Payload URL`和修改`Content type`为`appliction/json`

![](https://github.com/kittors/picx-images-hosting/raw/master/image.8kzwej5wg3.webp)

- `Payload URL` 是你当前的服务器地址+端口号+/接口名
我这里使用的是域名地址，因为我已经在DNS上解析了我的域名并指向我的服务器公网ip，具体的操作可以自行搜索。

- 修改`Content type`为appliction/json 是为了告知我的服务器该HTTP请求的请求正文的数据格式是JSON格式

最后点击`Add webhook`这个绿色按钮，当前仓库的webhook就算添加完成了


### 在debian系统下执行python程序

进入到放置python程序的目录执行以下命令(WebHooks_server.py是保存了python程序的文件)
```Shell
python3 WebHooks_server.py
```
运行情况如下
![](https://github.com/kittors/picx-images-hosting/raw/master/image.3rb1igw3a4.webp)

在自己的开发环境下 将自己开发的web代码 push到远程仓库的主分支下
`WebHooks_server.py`执行情况如下
![](https://github.com/kittors/picx-images-hosting/raw/master/image.lvx8ca08.webp)