/**
 * UPDATES AND DOCS AT: https://github.com/yushixin-1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 控制台输出处理
 */

export default function main(_) {

    // 输出用户配置信息
    if (_.__config.consoleList.length) {
        $.each(_.__config.consoleList, function (i) {
            let fl = _.__config.consoleList[i];
            console.log('\n' + ' %c '+(fl[0])+' %c '+(fl[1])+' ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; color:#000;padding:5px 0;');
        });
    }
}