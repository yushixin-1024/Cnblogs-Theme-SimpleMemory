/**
 * UPDATES AND DOCS AT: https://github.com/yushixin-1024
 * https://www.cnblogs.com/yushixin1024/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章底部信息按钮处理
 */
import '../../style/customBtn.css';

export default function main(_) {

    /**
     * 好文要顶
     */
    (() => {
        _.__timeIds.greenChannelDiggTId = window.setInterval(() => {
            let greenChannelDigg = $('#green_channel_digg');
            if (greenChannelDigg.length) {
                greenChannelDigg.after('<button class="custom-btn btn-11" onclick="' + greenChannelDigg.attr('onclick') + '">推荐该文' +
                    '<div class="dot"></div></button>');
                _.__tools.clearIntervalTimeId(_.__timeIds.greenChannelDiggTId);
            }
        }, 1000);
    })();

    /**
     * 关注我
     */
    (() => {
        _.__timeIds.greenChannelFollowTId = window.setInterval(() => {
            let greenChannelFollow = $('#green_channel_follow');
            if (greenChannelFollow.length) {
                greenChannelFollow.after('<button class="custom-btn btn-12" onclick="' + greenChannelFollow.attr('onclick') + '"><span>关注博主</span><span>关注博主</span></button>');
                _.__tools.clearIntervalTimeId(_.__timeIds.greenChannelFollowTId);
            }
        }, 1000);
    })();

    /**
     * 收藏本文
     */
    (() => {
        _.__timeIds.greenChannelFavoriteTId = window.setInterval(() => {
            let greenChannelFavorite = $('#green_channel_favorite');
            if (greenChannelFavorite.length) {
                greenChannelFavorite.after('<button class="custom-btn btn-7" onclick="' + greenChannelFavorite.attr('onclick') + '"><span>收藏本文</span></button>');
                _.__tools.clearIntervalTimeId(_.__timeIds.greenChannelFavoriteTId);
            }
        }, 1000);
    })();

    /**
     * 微信
     */
    (() => {
        _.__timeIds.greenChannelWechatTId = window.setInterval(() => {
            let greenChannelWechat = $('#green_channel_wechat');
            if (greenChannelWechat.length) {
                greenChannelWechat.after('<button class="custom-btn btn-13" onclick="' + greenChannelWechat.attr('onclick') + '">分享本文</button>');
                _.__tools.clearIntervalTimeId(_.__timeIds.greenChannelWechatTId);
            }
        }, 1000);
    })();
}