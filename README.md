## 部署
首先安装包`npm install`
开发：

`node bin/www`

生产环境建议使用PM2,后台监控

`npm run start`

`npm run stop`
默认链接 `http://localhost:3000`
### pm2

> pm2 是一个带有负载均衡功能的Node应用的进程管理器,并保证进程永远都活着，0秒的重载。其实它主要作用就是 nodejs 集群。按照我的理解，通俗的将，它的作用就是，本地开发环境，你要开启node服务，实现某些功能(比如监听某个端口)，就会在控制台执行"node app.js"(比如这个文件叫app吧！)，对应的node服务就会开启了，但是你只要一关闭这个控制台窗口，他就没有对应的服务进程了，每次起服务都得"控制台 -> node app.js"。在生产环境来说，很麻烦，这会就用到了pm2，只需要执行一次"pm2 start app.js"。ok，一劳永逸，控制台窗口随你怎么自由开启关闭，对应的服务进程永远在后面运行着。

- ***数据库结构在根目录，需要配置数据库和邮箱***
