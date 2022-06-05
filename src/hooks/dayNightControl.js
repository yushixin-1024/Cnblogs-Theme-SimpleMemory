/**
 * UPDATES AND DOCS AT: https://github.com/yushixin-1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 日夜间模式切换时
 */

export default function main(_, type) {
    if (typeof _.__config.hooks.dayNightControl === "function")
        _.__config.hooks.dayNightControl(_, type);
}