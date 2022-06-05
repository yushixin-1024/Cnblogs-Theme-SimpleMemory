/**
 * UPDATES AND DOCS AT: https://github.com/yushixin1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: code 渲染结束后
 */

export default function main(_) {
    if (typeof _.__config.hooks.afterCode === "function")
        _.__config.hooks.afterCode(_);
}