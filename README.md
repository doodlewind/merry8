# es6-simple
基础 ES6 项目模板


## 运行
安装依赖：

``` text
npm install
```

运行开发模式，将监听源文件变更：

``` text
npm run dev
```

开发模式下打包成功后，即可在另一终端窗口执行打包文件：

``` text
node dist/bundle.js
```

亦可将 `bundle.js` 通过 `<script>` 标签引入页面中，从而在浏览器环境中执行打包文件。


运行生产模式，将压缩打包文件：

``` text
npm run prod
```


## 配置
打包参数位于 `webpack.config.js` 中，默认配置如下：

### entry
采用单入口模式，将 `src/main.js` 作为入口。

### output
输出到 `dist` 目录下。

### loaders
将 JS 代码通过 babel-loader 按 ES2015 标准转译 。


## Changelog
*   `0.0.1` TODO

