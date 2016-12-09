(function (window) {

    // �����ǵ������⣬����ʹ���ϸ�ģʽ�������ܷ���Ǳ������
    'use strict';

    function IfeAlbum() {

        // ���ֵ�ö������
        this.LAYOUT = {
            PUZZLE: 1,    // ƴͼ����
            WATERFALL: 2, // �ٲ�����
            BARREL: 3     // ľͰ����
        };

        // ���б�������д������
        this.padding = {
            PUZZLE: {
                x: 0,
                y: 0
            },
            WATERFALL: {
                x: 0,
                y: 0
            }, // �ٲ�����
            BARREL: {
                x: 0,
                y: 0
            }
        };
        this.isFullScreen = true;


    }

    // ˽�б�������д������
    /**
     * �����������Ա��ȡ
     * */
    // �û��������ͼƬ���ı���
    var padding = {
        PUZZLE: {
            x: 0,
            y: 0
        },
        WATERFALL: {
            x: 0,
            y: 0
        }, // �ٲ�����
        BARREL: {
            x: 0,
            y: 0
        }
    };
    //��ʱ������
    var temp;
    //�Ƿ��Ѿ�ȫ��
    var isShowed = false;
    //��ȡ��Ҫ�ü�ͼƬ����ʽ
    function getClipImgStyle(contain, img) {
        var wdiff = img.width-contain.width*img.height/contain.height;
        var hdiff=0;
        var styles;
        wdiff = parseInt(wdiff);
        if(wdiff<0){//�߶Ȳ���,�Կ�ȶ������ţ��߶����
            hdiff = img.height-contain.height*img.width/contain.width;
            hdiff = parseInt(hdiff);
            var height = img.height*contain.width/img.width;
            hdiff = height-contain.height;
            styles={
                width: contain.width,
                height: height,
                marginTop: -hdiff/2
            }
        }else if(wdiff == 0){//֤������һ��
            styles = {
                width: '100%',
                height: '100%'
            }
        }else{//�����߶�Ϊ������,������
            var width = img.width*contain.height/img.height;
            wdiff = width -contain.width;
            styles = {
                width: width,
                height: contain.height,
                marginLeft: -wdiff/2
            }
        }
        return styles;
    }
    //���ݶ���������ʽ
    var setStyles = function (obj, styles) {
        for (var style in styles) {
            obj['style'][style] = styles[style];
        }
    };
    //���ݶ�����������
    var setAttr = function(obj, attrs){
        for (var attr in attrs) {
            obj[attr] = attrs[attr];
        }
    };
    //��ȡÿһ�����
    function getFrames(divs, isFullscreenEnabled){
        return Array.prototype.map.call(divs, function(div){
            if(isFullscreenEnabled){
                div.addEventListener("click", function(e){
                    if(e.target.tagName == 'IMG'){
                        showPhoto(e.target);
                    }
                });
            }

            return div;
        });
    }
    /**
     * ƴͼ���ֵ�˽�з���
     * */
    //��ȡƴͼ���ֵ������ʽ
    function getPuzzleFrameStyle(frameObj, nums) {
        var width = frameObj.width;
        var height = frameObj.height;
        console.log(frameObj.width, frameObj.height);
        var innerFrameStyles = []; //����ͼƬ����div��ʽ
        var outterFrameStyle = [];//�غ�ͼ�񲼾ֵ�div��ʽ
        var frameStyle = { //����style
            width: width,
            height: height,
            display: 'flex'
        };
        //��������Ч�� ���λ��
        var paddingStyles = {};
        var left_width = width/2;
        var right_width = height/2;
        var min_height = height/3;
        if(nums == 1){
            frameStyle.overflow = 'hidden';
        }else if (nums == 2) {
            frameStyle.display = '';
            frameStyle.position = 'relative';

        }else if(nums == 3) {
            left_width = width - height/2;
            paddingStyles = {
                obj1: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.x*2,
                    height: height
                },
                obj2: {
                    left: left_width,
                    top: height/2 - padding.PUZZLE.x,
                    width: height/2,
                    height: padding.PUZZLE.x*2
                }
            };
            innerFrameStyles = [{
                width:left_width,
                height: height,
                overflow: 'hidden'
            }, {
                width: right_width,
                height: right_width,
                overflow: 'hidden'
            },{
                width: right_width,
                height: right_width,
                overflow: 'hidden'
            }];
        }else if(nums == 4){
            frameStyle.flexWrap='wrap';
            paddingStyles = {
                obj1: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.x*2,
                    height: height
                },
                obj2: {
                    left: 0,
                    top: height/2-padding.PUZZLE.x,
                    width: width,
                    height: padding.PUZZLE.x*2
                }
            };
            innerFrameStyles = {
                width: left_width,
                height: right_width,
                overflow: 'hidden'
            };
        }else if(nums == 5){
            left_width = width*2/3;
            right_width = width/3;
            paddingStyles = {
                obj1: {
                    left: 0,
                    top: min_height*2 - padding.PUZZLE.x,
                    width: left_width,
                    height: padding.PUZZLE.x*2
                },
                obj2: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.y*2,
                    height: height
                },
                obj3: {
                    left: right_width-padding.PUZZLE.y,
                    top: min_height*2,
                    width: padding.PUZZLE.y*2,
                    height: min_height
                },
                obj4: {
                    left: left_width,
                    top: right_width - padding.PUZZLE.x,
                    width: right_width,
                    height: padding.PUZZLE.x*2
                }
            };
            innerFrameStyles=[{
                width: left_width,
                height: min_height*2,
                overflow: 'hidden'
            },{
                width: left_width/2,
                height: min_height,
                overflow: 'hidden'
            },{
                width: left_width/2,
                height: min_height,
                overflow: 'hidden'
            },{
                width: right_width,
                height: width/3,
                overflow: 'hidden'
            },{
                width: right_width,
                height: height-right_width,
                overflow: 'hidden'
            }];
            outterFrameStyle = {
                width: left_width,
                height: min_height,
                display: 'flex'
            };
        }else if(nums == 6){
            left_width = width*2/3;
            right_width = width/3;
            paddingStyles = {
                obj1: {
                    left: 0,
                    top: min_height*2 - padding.PUZZLE.x,
                    width: left_width,
                    height: padding.PUZZLE.x*2
                },
                obj2: {
                    left: left_width-padding.PUZZLE.y,
                    top: 0,
                    width: padding.PUZZLE.y*2,
                    height: height
                },
                obj3: {
                    left: right_width-padding.PUZZLE.y,
                    top: min_height*2,
                    width: padding.PUZZLE.y*2,
                    height: min_height
                },
                obj4: {
                    left: left_width,
                    top: min_height - padding.PUZZLE.x,
                    width: right_width,
                    height: padding.PUZZLE.x*2
                },
                obj5: {
                    left: left_width,
                    top: min_height*2 - padding.PUZZLE.x,
                    width: right_width,
                    height: padding.PUZZLE.x*2
                }
            };
            innerFrameStyles = [{
                width: left_width,
                height: min_height*2,
                overflow: 'hidden'
            },{
                width: left_width/2,
                height: min_height,
                overflow: 'hidden'
            },{
                width: left_width/2,
                height: min_height,
                overflow: 'hidden'
            },{
                width: right_width,
                height: min_height,
                overflow: 'hidden'
            },{
                width: right_width,
                height: min_height,
                overflow: 'hidden'
            },{
                width: right_width,
                height: min_height,
                overflow: 'hidden'
            }];
            outterFrameStyle = {
                width: left_width,
                height: min_height,
                display: 'flex'
            };
        }

        return {
            innerFrameStyles: innerFrameStyles, //����ͼƬ����div��ʽ
            outterFrameStyle: outterFrameStyle, //�غ�ͼ�񲼾ֵ�div��ʽ
            frameStyle: frameStyle,              //����������ʽ
            paddingStyles: paddingStyles        //padding������Ч��
        };

    }
    //��ȡƴͼ������Ƭ��ʽ
    function getPuzzleImgStyles(imgs, contain) {

        return Array.prototype.map.call(imgs, function(img, index){
            var container = contain;
            if(imgs.length>2 && imgs.length!=4){
                container = contain[index];
            }
            var imgStyle = getClipImgStyle(container, {
                width: img.naturalWidth,
                height: img.naturalHeight
            });
            if(imgs.length == 2){
                imgStyle.position = 'absolute';
            }

            return imgStyle;
        });
    }
    //���ݶ������ȷ��ƴͼ����
    var puzzleLayout = function(obj) {//obj���

        var imgs = obj.children;
        var contain = {
            width: obj.clientWidth,
            height: obj.clientHeight
        };
        var imgStyles;
        var frameStyles;
        var frameStyle;
        var innerObjs;
        var innerFrameStyles;
        var imgPaddings = {};
        if(imgs.length == 1){
            imgStyles = getPuzzleImgStyles(imgs, contain);
            frameStyles = getPuzzleFrameStyle(contain, 1);
            frameStyle = frameStyles.frameStyle;
            innerObjs = {
                obj: {
                    innerFrameStyle: '',
                    imgStyle: imgStyles[0],
                    img: imgs[0]
                }
            };
        }else if(imgs.length == 2){
            var imgAttrs = ['left_tx', 'right_tx'];//img ����
            imgStyles = getPuzzleImgStyles(imgs, contain);
            frameStyles = getPuzzleFrameStyle(contain, 2);
            frameStyle = frameStyles.frameStyle;
            innerObjs = {
                obj1: {
                    img: imgs[0],
                    imgAttr: {
                        className: imgAttrs[0]
                    },
                    imgStyle: imgStyles[0]
                },
                obj2: {
                    img: imgs[1],
                    imgAttr: {
                        className: imgAttrs[1]
                    },
                    imgStyle: imgStyles[0]
                }
            };

        }else if(imgs.length ==3){
            frameStyles = getPuzzleFrameStyle(contain, 3);
            innerFrameStyles = frameStyles.innerFrameStyles;
            frameStyle = frameStyles.frameStyle;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
            innerObjs = {
                obj1: {
                    innerFrameStyle: innerFrameStyles[0],
                    img: imgs[0],
                    imgStyle: imgStyles[0]
                },
                obj2: {
                    innerFrameStyle: '',
                    innerObj: {
                        sameNums: Array.prototype.slice.apply(imgs,[1,3]),
                        obj: {
                            innerFrameStyle: innerFrameStyles[1],
                            imgStyle: imgStyles[1]
                        }

                    }
                }
            };

        }else if(imgs.length == 4){
            frameStyles = getPuzzleFrameStyle(contain, 4);
            frameStyle = frameStyles.frameStyle;
            innerFrameStyles = frameStyles.innerFrameStyles;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
            innerObjs = {
                sameNums: Array.prototype.slice.apply(imgs,[0,4]),
                obj: {
                    innerFrameStyle: innerFrameStyles,
                    imgStyle: imgStyles[0]
                }
            };
        }else if(imgs.length == 5){
            frameStyles = getPuzzleFrameStyle(contain, 5);
            frameStyle = frameStyles.frameStyle;
            innerFrameStyles = frameStyles.innerFrameStyles;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
            innerObjs = {
                obj1: {
                    innerFrameStyle: '',
                    innerObj: {
                        obj1: {
                            innerFrameStyle: innerFrameStyles[0],
                            img: imgs[0],
                            imgStyle: imgStyles[0]
                        },
                        obj2: {
                            innerFrameStyle: frameStyles.outterFrameStyle,
                            innerObj: {
                                sameNums: Array.prototype.slice.apply(imgs,[1,3]),
                                obj: {
                                    innerFrameStyle: innerFrameStyles[1],
                                    imgStyle: imgStyles[1]
                                }
                            }
                        }
                    }
                },
                obj2: {
                    innerFrameStyle: '',
                    innerObj: {
                        obj1: {
                            innerFrameStyle: innerFrameStyles[3],
                            img: imgs[3],
                            imgStyle: imgStyles[3]
                        },
                        obj2: {
                            innerFrameStyle: innerFrameStyles[4],
                            img: imgs[4],
                            imgStyle: imgStyles[4]
                        }
                    }
                }
            };


        }else if(imgs.length == 6) {
            frameStyles = getPuzzleFrameStyle(contain, 6);
            innerFrameStyles = frameStyles.innerFrameStyles;
            frameStyle = frameStyles.frameStyle;
            imgStyles = getPuzzleImgStyles(imgs, innerFrameStyles);
            imgPaddings = frameStyles.paddingStyles;
            innerObjs = {
                obj1: {
                    innerFrameStyle: '',
                    innerObj: {
                        obj1: {
                            innerFrameStyle: innerFrameStyles[0],
                            img: imgs[0],
                            imgStyle: imgStyles[0]
                        },
                        obj2: {
                            innerFrameStyle: frameStyles.outterFrameStyle,
                            innerObj: {
                                sameNums: Array.prototype.slice.apply(imgs, [1, 3]),
                                obj: {
                                    innerFrameStyle: innerFrameStyles[1],
                                    imgStyle: imgStyles[1]
                                }
                            }
                        }
                    }
                },
                obj2: {
                    innerFrameStyle: '',
                    innerObj: {
                        sameNums: Array.prototype.slice.apply(imgs, [3, 6]),
                        obj: {
                            innerFrameStyle: innerFrameStyles[3],
                            imgStyle: imgStyles[3]
                        }
                    }
                }
            };
        }
        return {
            innerObjs: innerObjs,   //����ڲ����ж���
            frameStyle: frameStyle,  //���
            imgPaddings: imgPaddings // ��Ƭ���
        };

    }

    // ƴͼ������������� ƴͼ���ֱȽϸ���
    function puzzleReSet(albumStyles, innerObjs) {
        var frame = document.createElement('DIV');
        setStyles(frame, albumStyles);
        if (innerObjs.sameNums) {
            for (var i = 0; i < innerObjs.sameNums.length; i++) {
                var box = document.createElement('DIV');
                setStyles(box, innerObjs.obj.innerFrameStyle);
                if (innerObjs.obj.attr) {
                    setAttr(box, innerObjs.obj.attr);
                }
                if(innerObjs.obj.imgStyle){
                    setStyles(innerObjs.sameNums[i], innerObjs.obj.imgStyle);
                }

                box.appendChild(innerObjs.sameNums[i]);

                frame.appendChild(box);
            }
        } else {
            for (var obj in innerObjs) {
                if (innerObjs[obj].innerObj) {//������ģ��ݹ�����
                    var box = puzzleReSet(innerObjs[obj].innerFrameStyle, innerObjs[obj].innerObj);
                } else {
                    var box = document.createElement('DIV');
                    setStyles(box, innerObjs[obj].innerFrameStyle);//�������
                    if (innerObjs[obj].attr) {
                        setAttr(box, innerObjs[obj].attr);
                    }
                    if (innerObjs[obj].img) {
                        if(innerObjs[obj].imgAttr){
                            setAttr(innerObjs[obj].img, innerObjs[obj].imgAttr);
                        }
                        if(innerObjs[obj].imgStyle){
                            setStyles(innerObjs[obj].img, innerObjs[obj].imgStyle);
                        }
                        box.appendChild(innerObjs[obj].img);
                    }
                }
                frame.appendChild(box);
            }
        }
        return frame;
    }
    //��������Ч���ﵽpadding
    function setPaddings(frame, paddings) {
        for(var style in paddings) {
            var label = document.createElement('LABEL');
            label.className = 'label_imgPadding';
            setStyles(label, paddings[style]);
            frame.appendChild(label);
        }
    }

    /**
     * �ٲ����ֵ�˽�з���
     * */
    function createFallFrame(fallFarme) { //���ɿ��,Ĭ������
        var cols = parseInt(fallFarme.className.split(' ')[0].split('_')[1]) || 4;
        var col_width = (fallFarme.offsetWidth - padding.WATERFALL.y*(cols*2 + 1)) / cols;
        var frame = document.createElement('DIV');// �����
        var styles = {
            width: fallFarme.clientWidth, // ע�� clientWidth + boderWidth = offsetWidth
            minHeight: fallFarme.clientHeight
        };
        frame.className = 'fall_cols_parent';
        setStyles(frame, styles);
        for(var i=0;i<cols;i++) {//����
            var item = document.createElement('DIV');
            item.className = 'fall_cols';
            var itemStyle = {
                width: col_width,
                minHeight: styles.minHeight,
                marginLeft: padding.WATERFALL.y,
                marginTop: padding.WATERFALL.y
            };
            if(i === (cols-1)){
                itemStyle.marginRight = padding.WATERFALL.y;
            }
            setStyles(item, itemStyle);
            frame.appendChild(item);
        }
        return {
            frame: frame,
            col_width: col_width
        };
    }
    //��ȡ����ڲ��������ʽ
    function getPhotoStyles(frame, width) {//style , src
        return Array.prototype.map.call(frame.children, function(img){
            var contain = {
                width: width,
                height: width + Math.random()*100
            };
            var imgWh = {
                width:img.naturalWidth,
                height: img.naturalHeight
            };

            var imgStyles = getClipImgStyle(contain, imgWh);
            return {
                src: img.src,
                style: imgStyles,
                contain: contain
            };
        });

    }



    //�õ�ÿһ��col�ڲ�ͼƬ������ܸ߶�
    function getHight(obj){
        var sum = 0;
        var items = obj.children;
        Array.prototype.forEach.call(items, function(item){
            var height = parseInt(item.style.height.split('px')[0]);
            sum += height;
        });
        return sum;
    }
    //�ó���������ͼƬ��Ŀ������DOM
    function getFallTarget(frame) {
        var cols = frame.children;
        var res = getHight(cols[0]);
        var node=cols[0];
        for(var i=1;i<cols.length;i++){
            var height = getHight(cols[i]);
            if(res > height){
                res = height;
                node=cols[i];
            }
        }
        return node;
    }
    //Ϊimg��װһ��div�Ա���� ��С�߶�
    function createChildFrame(frameObj, img) {
        var div = document.createElement('DIV');
        if(frameObj.attr){
            setAttr(div, frameObj.attr);
        }
        if(frameObj.styles){
            setStyles(div, frameObj.styles);
        }
        div.appendChild(img);

        return div;
    }

    /**
     * ľͰ���ֵ�˽�з���
     * */

    //���ݿ�߱���ǰ����
    function group(images, option) {
        //��ͼƬ����
        var raws=[];
        var rawWidth=0;
        var rawStart=0;
        var rawEnd=0;
        for(var j=0;j<images.length;j++){
            images[j].height= option.rowHeight;
            images[j].width= option.rowHeight*images[j].ratio;
            rawWidth+=images[j].width;
            rawEnd=j;
            if(rawWidth>option.clientWidth){
                var lastWidth=rawWidth-images[j].width;
                var rawRatio=option.rowHeight/lastWidth;
                var lastHeight=rawRatio*(option.clientWidth);//(rawEnd-rawStart-1)*8
                raws.push({
                    start:rawStart,
                    end:rawEnd-1,
                    height: lastHeight
                });
                rawWidth=images[j].width;
                rawStart=j;
            }
        }
        raws.push({
            start: rawStart,
            end: images.length-1,
            height: option.rowHeight
        });
        return raws;
    }


    /**
     * ʵ��ȫ���������
     * */
    //ȫ���������ʾ
    function showPhoto(img) {

        var light = document.getElementsByClassName('white_content')[0];
        var fade = document.getElementsByClassName('black_overlay')[0];
        var width = 0.8*document.body.clientWidth;
        var height =  0.8*document.body.clientHeight;
        var focusStyle = {
            width: width,
            height: height
        };

        if(!isShowed){
            isShowed = true;
            var lightImg = document.createElement('IMG');
            var imgWidth = img.naturalWidth;
            var imgHeight = img.naturalHeight;
            var radio = imgWidth/imgHeight;
            if(radio >1){
                focusStyle.height = 1/radio*0.8*width;
            }else{
                focusStyle.width = radio*0.8*height;
            }
            lightImg.src = img.src;
            setStyles(lightImg, focusStyle);
            setStyles(light, focusStyle);
            fade.style.display = 'block';
            light.appendChild(lightImg);
            light.style.display = 'block';
        } else {
            isShowed = false;
            light.innerHTML = '';
            fade.style.display = 'none';
            light.style.display = 'none';
        }


    }

    //����ȫ���������DOM
    function addPhotoShade() {
        var light = document.createElement('DIV');
        var fade = document.createElement('DIV');
        light.className="white_content";
        light.id = 'light';
        fade.className = 'black_overlay';
        fade.id = 'fade';
        light.addEventListener("click", function(e){
            if(e.target.tagName == 'IMG'){
                showPhoto(e.target);
            }
        });
        document.body.appendChild(light);
        document.body.appendChild(fade);

    }


    /************* �����Ǳ����ṩ�Ĺ��з��� *************/



    /**
     * ��ʼ�����������
     * �����ԭ������ͼƬʱ���÷������滻ԭ��ͼƬ
     * @param {(string|string[])} image  һ��ͼƬ�� URL �����ͼƬ URL ��ɵ�����
     * @param {object}            option ������
     */
    IfeAlbum.prototype.setImage = function (images, option) {//ÿ��ִ������һ�����

        if (typeof images === 'string') {
            // ��װ�����鴦��
            this.setImage([images]);
            return;
        }

        // ʵ��ƴͼ����
        if(option.type == 'PUZZLE'){
            //var puzzleNewLayouts = puzzleLayout(images);//����img_frame���ɲ���
            var newFrame = puzzleReSet(images.frameStyle, images.innerObjs);//���ݲ�����������frame_dom
            temp.innerHTML = '';
            temp.appendChild(newFrame);
            setPaddings(temp, images.imgPaddings);//��������-ͼƬpadding
        }else if(option.type == 'WATERFALL'){
            //�����ٲ���������
            var newFallFrame = createFallFrame(images);
            //����ÿ��ͼƬ����ʽ
            temp = newFallFrame.frame;
            var imgStyles = getPhotoStyles(images, Math.floor(newFallFrame.col_width));

            var imgObjs = imgStyles.map(function(img){
                var imgDom = document.createElement('IMG');
                imgDom.src = img.src;
                setStyles(imgDom, img.style);
                img.contain.marginBottom = padding.WATERFALL.x;
                var childFrame = createChildFrame({
                    styles: img.contain
                }, imgDom);

                return childFrame;
            });
            this.LAYOUT.WATERFALL[option.index] = imgObjs;//�������index�滻ԭ�е�img
            return imgObjs;
        }else if (option.type == 'BARREL'){

        }

    };

    /**
     * ��ʼ�����������к���ָ��className�����
     * �����ԭ������ͼƬʱ���÷������滻ԭ��ͼƬ
     */
    IfeAlbum.prototype.run = function () {//ÿ��ִ������һ�����
        addPhotoShade();//����¼�
        // ʵ��ƴͼ����
        var _this = this;
        this.setLayout();
        var layouts = this.getLayout();
        var puzzles = layouts.PUZZLE;//�������
        var falls = layouts.WATERFALL;
        var buckets = layouts.BARREL;

        puzzles.forEach(function(frame){
            temp = frame;//��frame������ʱ��
            var puzzleNewLayouts = _this.addImage(frame, {type: 'PUZZLE'});//���ɲ���
            _this.setImage(puzzleNewLayouts, {type: 'PUZZLE'});//����������Ƭ
        });
        falls.forEach(function(frame, index){
            var option = {
                type: 'WATERFALL',
                index: index
            };
            var imgObjs = _this.setImage(frame, option);
            //���ɺ����ͼƬ
            _this.addImage(imgObjs, option);
            //�滻ԭ��������Ԫ��
            frame.innerHTML = '';
            frame.appendChild(temp);

        });
        buckets.forEach(function(bucket){
            var images = _this.getImageDomElements(bucket);
            temp = bucket;
            var groups = group(images, {
                clientWidth: bucket.clientWidth,
                rowHeight: 70
            });
            bucket.innerHTML = '';
            _this.addImage(images, {
                groups: groups,
                type: 'BARREL'
            });
        });


    };

    /**
     * ��ȡ�������ͼ���Ӧ�� DOM Ԫ��
     * ���Բ��� �����Ǹ�����Ԫ��
     * @return {HTMLElement[]} �������ͼ���Ӧ�� DOM Ԫ����ɵ�����
     */
    IfeAlbum.prototype.getImageDomElements = function(frame) {
        //ƴͼ���ִ���
        var imgs = frame.children;
        return Array.prototype.map.call(imgs, function(img){
            console.log(img,img.naturalWidth, img.naturalHeight, img.naturalWidth/img.naturalHeight);
            var ratio = img.naturalWidth/img.naturalHeight;//��ȡΪ�յ����
            if(!ratio){
                ratio = 1;
            }
            return {
                width: img.naturalWidth,
                height: img.naturalHeight,
                ratio: ratio,
                src: img.src
            }
        });

    };



    /**
     * ��������ͼƬ
     * ��ƴͼ�����£�����ͼƬ�������¼��㲼�ַ�ʽ��������������β��׷��ͼƬ
     * @param {(string|string[])} image һ��ͼƬ�� URL �����ͼƬ URL ��ɵ�����
     */
    IfeAlbum.prototype.addImage = function (image, option) {
        //����imgs������ʽ
        if(option.type == 'PUZZLE'){
            var puzzleNewLayouts = puzzleLayout(image);//����img_frame���ɲ���
            return puzzleNewLayouts;
        }else if(option.type=='WATERFALL'){
            image.forEach(function(img){
                var target = getFallTarget(temp);
                target.appendChild(img);
            });
        }else if(option.type = 'BARREL'){
            option.groups.forEach(function(group){
                var nums = group.end - group.start +1;
                var interval = padding[option.type].x;
                var lastInterval = (nums-1)*interval/nums;
                console.log(lastInterval);
                for(var i=group.start;i<=group.end;i++){
                    var img = document.createElement('IMG');
                    var style = {
                        width: Math.floor(image[i].ratio*group.height-lastInterval)-0.5,//��֪��Ϊʲô�������
                        height: Math.floor(group.height),
                        marginBottom: padding[option.type].y
                    };
                    if(i!=group.end){
                        style.marginRight = interval;
                    }
                    setStyles(img, style);
                    img.src = image[i].src;
                    temp.appendChild(img);
                }
            });
        }

    };



    /**
     * �Ƴ�����е�ͼƬ
     * @param  {(HTMLElement|HTMLElement[])} image ��Ҫ�Ƴ���ͼƬ
     * @return {boolean} �Ƿ�ȫ���Ƴ��ɹ�
     */
    IfeAlbum.prototype.removeImage = function (image) {

    };



    /**
     * �������Ĳ���
     * @param {number} layout ����ֵ��IfeAlbum.LAYOUT �е�ֵ
     */
    IfeAlbum.prototype.setLayout = function () {//�洢���������Ϣ
        //type == 'PUZZLE' || type == 'WATERFALL' || type == 'BARREL'
        for(var key in this.LAYOUT){
            if(key == 'PUZZLE'){
                var divs = document.getElementsByClassName('puzzle');
                this.LAYOUT[key] = getFrames(divs, this.isFullscreenEnabled);

            }else if(key == 'WATERFALL'){
                this.LAYOUT[key] = getFrames(document.querySelectorAll('div[class^="waterfall"]'), this.isFullscreenEnabled);

            }else if(key == 'BARREL'){
                var buckets = document.getElementsByClassName('barrel');
                this.LAYOUT[key] = getFrames(buckets, this.isFullscreenEnabled);
            }
        }


    };



    /**
     * ��ȡ���Ĳ���
     * @return {number} ����ö�����͵�ֵ
     */
    IfeAlbum.prototype.getLayout = function() {
        return this.LAYOUT;
    };



    /**
     * ����ͼƬ֮��ļ��
     * ע�����ֵ������ͼƬ��ļ�࣬��Ӧֱ������ͼƬ�� margin ���ԣ������Ͻ�ͼ����ߺ��ϱ�Ӧ�ý���������ߺ��ϱ�
     * ��᱾��� padding ʼ���� 0���û����޸�������Ŀհ���Ҫ�Լ��������Ԫ�ص� padding
     * @param {number}  x  ͼƬ֮��ĺ�����
     * @param {number} [y] ͼƬ֮��������࣬����� undefined ���ͬ�� x
     */
    IfeAlbum.prototype.setGutter = function (type, x, y) {
        if(typeof x != 'number'){
            return;
        }
        if(!y || typeof y!='number'){
            y = x;
        }
        if(type == 'PUZZLE' || type == 'WATERFALL' || type == 'BARREL'){
            padding[type].x = x;
            padding[type].y = y;
        }
    };



    /**
     * ������ͼƬʱȫ�����ͼƬ
     */
    IfeAlbum.prototype.enableFullscreen = function () {
        this.isFullScreen = true;
    };



    /**
     * ��ֹ���ͼƬʱȫ�����ͼƬ
     */
    IfeAlbum.prototype.disableFullscreen = function () {
        this.isFullScreen = false;
    };



    /**
     * ��ȡ���ͼƬʱȫ�����ͼƬ�Ƿ�����
     * @return {boolean} �Ƿ�����ȫ�����
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {
        return this.isFullScreen;
    };


    /**
     * ����ľͰģʽÿ��ͼƬ����������
     * @param {number} min ����ͼƬ��������
     * @param {number} max ���ͼƬ��������
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // ע���쳣����Ĵ�����һ����׳�Ŀ�
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // ���ʵ��

    };



    /**
     * ��ȡľͰģʽÿ��ͼƬ��������
     * @return {number} ���ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * ��ȡľͰģʽÿ��ͼƬ��������
     * @return {number} ����ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * ����ľͰģʽÿ�и߶ȵ������ޣ���λ����
     * @param {number} min ��С�߶�
     * @param {number} max ���߶�
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * ��ȡľͰģʽÿ�и߶ȵ�����
     * @return {number} ���ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * ��ȡľͰģʽÿ�и߶ȵ�����
     * @return {number} ����ͼƬ��������
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // �������ӵ������ӿ�



    /************* �����Ǳ����ṩ�Ĺ��з��� *************/



    // ʵ����
    if (typeof window.ifeAlbum === 'undefined') {
        // ֻ�е�δ��ʼ��ʱ��ʵ����
        window.ifeAlbum = new IfeAlbum();

    }

}(window));