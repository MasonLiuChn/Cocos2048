/**
 * Created by admin on 16/5/17.
 */
// 层
var MainLayer = cc.Layer.extend({
    cardArr:null,  // 存放4x4=16个卡片  
    // 初始化  
    init:function () {
        this._super();
        var size = cc.winSize;
        // 主界面背景层->设置颜色
        var lazyLayer = cc.LayerColor.create(cc.color(180, 170, 160, 255));
        this.addChild(lazyLayer,0);

        // 创建卡片数组  
        this.cardArr = new Array(4);
        for(var i=0; i<4; i++) {
            this.cardArr[i] = new Array(4);
        }

        // 初始化所有卡片，数字为0，不显示  
        this.createCards(size);

        return true;
    },

    //初始化卡片数组*******************************  
    createCards:function(size)
    {
        var unitSize = (size.height - 80)/4;
        for(var i=0; i<4; i++) {
            for(var j=0; j<4; j++) {
                var card = CardSprite.createCardSprite(0, unitSize, unitSize, unitSize*i + 210, unitSize*j + 30);
                this.cardArr[i][j] = card;
                this.addChild(card);
            }
        }
    }
});

// 场景
var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        layer.init();
        this.addChild(layer);
    }
});