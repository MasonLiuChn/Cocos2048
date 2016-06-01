var Helloworld = cc.Layer.extend({
    firstX:null,
    firstY:null,
    cardArr:null,
    score:0,
    scoreLabel:null,
    gameOverLayer:null,
    gameWinLayer:null,

    init:function () {
        this._super();
        // 设置单点触摸
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this, 0, true);

        var size = cc.Director.getInstance().getWinSize();

        // 背景层->设置颜色
        var lazyLayer = cc.LayerColor.create(new cc.Color4B(180, 170, 160, 255) , null, null);
        this.addChild(lazyLayer);

        // 说明
        var note = cc.LabelTTF.create("开发者：李松", "黑体", 10);
        note.setColor(new cc.Color3B(50,50,50));
        note.setOpacity(180);
        note.setAnchorPoint(0, 0);
        note.setPosition(size.width/2 + 190, 110);
        this.addChild(note);
        var tool = cc.LabelTTF.create("开发工具：WebStorm 8.0", "黑体", 10);
        tool.setColor(new cc.Color3B(50,50,50));
        tool.setOpacity(180);
        tool.setAnchorPoint(0, 0);
        tool.setPosition(size.width/2 + 190, 90);
        this.addChild(tool);
        var engine = cc.LabelTTF.create("游戏框架：Cocos2d-html5", "黑体", 10);
        engine.setColor(new cc.Color3B(50,50,50));
        engine.setOpacity(180);
        engine.setAnchorPoint(0, 0);
        engine.setPosition(size.width/2 + 190, 70);
        this.addChild(engine);
        var language = cc.LabelTTF.create("开发语言：JavaScript", "黑体", 10);
        language.setColor(new cc.Color3B(50,50,50));
        language.setOpacity(180);
        language.setAnchorPoint(0, 0);
        language.setPosition(size.width/2 + 190, 50);
        this.addChild(language);
        var time = cc.LabelTTF.create("开发周期：两天","黑体", 10);
        time.setColor(new cc.Color3B(50,50,50));
        time.setOpacity(180);
        time.setAnchorPoint(0, 0);
        time.setPosition(size.width/2 + 190, 30);
        this.addChild(time);

        // 显示分数
        var label = cc.LabelTTF.create("Score : ", "Arial", 20);
        label.setAnchorPoint(0,0);
        label.setPosition(size.width/2 - 50, size.height-50);
        this.addChild(label);
        this.scoreLabel = cc.LabelTTF.create("0", "Arial", 20);
        this.scoreLabel.setAnchorPoint(0,0);
        this.scoreLabel.setPosition(size.width/2 + 20, size.height-50);
        this.addChild(this.scoreLabel);

        // 创建卡片数组
        this.cardArr = new Array(4);
        for(var i=0; i<4; i++)
        {
            this.cardArr[i] = new Array(4);
        }

        // 初始化卡片数组
        this.createCards(size);

        // 随机生成两个数字
        this.autoCreateCardNumber();
        this.autoCreateCardNumber();

        // 打开触摸
        this.setTouchEnabled(true);
        return true;
    },

    onTouchBegan:function (touch, event) {
        var touchPoint = touch.getLocation();
        this.firstX = touchPoint.x;
        this.firstY = touchPoint.y;

        return true;
    },

    onTouchEnded:function (touch, event) {
        var touchPoint = touch.getLocation();
        var offsetX = this.firstX - touchPoint.x;
        var offsetY = this.firstY - touchPoint.y;

        if(Math.abs(offsetX) > Math.abs(offsetY))
        {
            if(offsetX > 5)
            {
                this.doLeft();
                this.doCheckGameOver();
                this.setScore(this.score);
            }
            else if(offsetX < -5)
            {
                this.doRight();
                this.doCheckGameOver();
                this.setScore(this.score);
            }
        }
        else
        {
            if(offsetY > 5)
            {
                this.doDown();
                this.doCheckGameOver();
                this.setScore(this.score);
            }
            else if(offsetY < -5)
            {
                this.doUp();
                this.doCheckGameOver();
                this.setScore(this.score);
            }
        }
    },
    // 向上***************************************
    doUp:function(){
        var isdo = false;
        for (var x=0; x<4; ++x)
        {
            for (var y=3; y>=0; --y)
            {
                for (var y1=y-1; y1>=0; --y1)
                {
                    if (this.cardArr[x][y1].getNumber() > 0)
                    {
                        if (this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            ++y;
                            isdo = true;
                        }
                        else if(this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向下***************************************
    doDown:function() {
        var isdo = false;
        for (var x=0; x<4; ++x)
        {
            for (var y=0; y<4; ++y)
            {
                for (var y1=y+1; y1<4; ++y1)
                {
                    if (this.cardArr[x][y1].getNumber() > 0)
                    {
                        if (this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            --y;
                            isdo = true;
                        }
                        else if(this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向左***************************************
    doLeft:function() {
        var isdo = false;
        for (var y=0; y<4; ++y)
        {
            for(var x=0; x<4; ++x)
            {
                for(var x1=x+1; x1<4; ++x1)
                {
                    if(this.cardArr[x1][y].getNumber() > 0)
                    {
                        if(this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            --x;
                            isdo = true;
                        }
                        else if(this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向右***************************************
    doRight:function() {
        var isdo = false;
        for (var y = 0; y < 4; ++y)
        {
            for (var x = 3; x >= 0; --x)
            {
                for (var x1 = x - 1; x1 >= 0; --x1)
                {
                    if (this.cardArr[x1][y].getNumber() > 0)
                    {
                        if (this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            ++x;
                            isdo = true;
                        }else if(this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 初始化卡片数组*******************************
    createCards:function(size)
    {
        var unitSize = (size.height - 80)/4;
        for(var i=0; i<4; i++)
        {
            for(var j=0; j<4; j++)
            {
                var card = CardSprite.createCardSprite(0, unitSize, unitSize, unitSize*i + 210, unitSize*j + 30);
                this.cardArr[i][j] = card;
                this.addChild(card);
            }
        }
    },
    // 随机生成新的2或4的卡片************************
    autoCreateCardNumber:function()
    {
        while(1)
        {
            var i = Math.floor(Math.random()*4);  // generate a number between 0 and 3
            var j = Math.floor(Math.random()*4);

            if (this.cardArr[i][j].getNumber() == 0)
            {
                this.cardArr[i][j].setNumber(Math.floor(Math.random()*10) < 1 ? 4 : 2);
                break;
            }

            if (!this.shouldCreateCardNumber())
            {
                break;
            }
        }
    },
    // 判断是否应该自动生成卡片数字******************
    shouldCreateCardNumber:function()
    {
        var should = false;
        for(var i=0; i<4; ++i)
        {
            for(var j=0; j<4; ++j)
            {
                if (this.cardArr[i][j].getNumber() == 0)
                {
                    should = true;
                    break;
                }
            }
        }
        return should;
    },
    // 判断游戏是否结束*******************************
    doCheckGameOver:function()
    {
        var size = cc.Director.getInstance().getWinSize();

        var isGameOver = true;
        for(var y=0; y<4; ++y)
        {
            for(var x=0; x<4; ++x)
            {
                if(this.cardArr[x][y].getNumber() == 0 ||
                    (x>0&&(this.cardArr[x][y].getNumber() == this.cardArr[x-1][y].getNumber())) ||
                    (x<3&&(this.cardArr[x][y].getNumber() == this.cardArr[x+1][y].getNumber())) ||
                    (y>0&&(this.cardArr[x][y].getNumber() == this.cardArr[x][y-1].getNumber())) ||
                    (y<3&&(this.cardArr[x][y].getNumber() == this.cardArr[x][y+1].getNumber())))
                {
                    isGameOver = false;
                }
            }
        }

        if (isGameOver)  // if the game is over
        {
            console.log("The Game Is Over!");
            this.gameOverLayer = cc.LayerColor.create(new cc.Color4B(0,0,0,100), null, null);
            var labelGameOver = cc.LabelTTF.create("Game Over!!!", "Arial", 60);
            labelGameOver.setPosition(size.width/2, size.height/2);
            this.gameOverLayer.addChild(labelGameOver);
            this.getParent().addChild(this.gameOverLayer, 1);

            this.scheduleOnce(this.removeGameOverLayer, 2);

        }
        else
        {
            if (this.shouldCreateCardNumber())
            {
                this.autoCreateCardNumber();
            }
        }

        if(this.isWin())   // if win
        {
            this.gameWinLayer = cc.LayerColor.create(new cc.Color4B(0,0,0,100), null, null);
            var labelGameWin = cc.LabelTTF.create("You Win!!!", "Arial", 60);
            labelGameWin.setPosition(size.width/2, size.height/2 + 30);
            var text = cc.LabelTTF.create("Your Score : ", "Arial", 30);
            text.setPosition(size.width/2 - 50, size.height/2 - 30);
            var labelScore = cc.LabelTTF.create(this.score, "Arial", 30);
            labelScore.setPosition(size.width/2 + 75, size.height/2 - 30);
            this.gameWinLayer.addChild(labelGameWin);
            this.gameWinLayer.addChild(text);
            this.gameWinLayer.addChild(labelScore);
            this.getParent().addChild(this.gameWinLayer, 1);

            this.scheduleOnce(this.removeGameWinLayer, 4);
        }
    },
    // 判断是否胜利
    isWin:function()
    {
        var Win = false;
        for (var i=0; i<4; ++i)
        {
            for(var j=0; j<4; ++j)
            {
                if (this.cardArr[i][j].getNumber() == 2048)
                {
                    Win = true;
                    break;
                }
            }
        }
        return Win;
    },
    // 更新分数
    setScore:function(s)
    {
        this.scoreLabel.setString(s);
    },
    // 移除GameOverLayer
    removeGameOverLayer:function(dt)
    {
        this.gameOverLayer.removeFromParent();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new HelloWorldScene()));
    },
    // 移除GameWinLayer
    removeGameWinLayer:function(dt)
    {
        this.gameWinLayer.removeFromParent();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new HelloWorldScene()));
    }
});

// scene
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});



