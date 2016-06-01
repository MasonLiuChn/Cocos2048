var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Hello World11", "", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        this.addChild(helloLabel);
        // add bg
        var bgSprite = new cc.Sprite(res.BackGround_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(bgSprite, 0);
        //add start menu
        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        return true;
    }
});

//  函数对象 --> 原型对象
//  非函数对象  -


var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});