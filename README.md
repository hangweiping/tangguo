## 部署
首先安装包`npm install`
开发：

`node bin/www`

生产环境建议使用PM2,后台监控

`npm run start`

`npm run stop`
默认链接 `http://localhost:3000`


### 多语言
引用 `<%=t('home.title')%>`

- ***数据库结构在根目录，需要配置数据库和邮箱***
