/**
 * UPDATES AND DOCS AT: https://github.com/yushixin-1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 主题配置处理
 */
import defaultConfig from './config.json5';

export default function main() {

    // 获取用户默认配置
    const userConfig = typeof window.cnblogsConfig === 'undefined' ? {} : window.cnblogsConfig;

    // 合并配置
    return $.extend( true, defaultConfig, userConfig);
}