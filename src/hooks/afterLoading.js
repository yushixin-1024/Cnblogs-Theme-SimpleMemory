/**
 * UPDATES AND DOCS AT: https://github.com/yushixin1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: loading 结束后
 */

export default function main(_) {
    if (typeof _.__config.hooks.afterLoading === "function")
        _.__config.hooks.afterLoading(_);
}