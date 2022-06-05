/**
 * UPDATES AND DOCS AT: https://github.com/yushixin-1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: loading 开始前
 */

export default function main(_) {
    if (typeof _.__config.hooks.beforeLoading === "function")
        _.__config.hooks.beforeLoading(_);
}