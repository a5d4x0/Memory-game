
let control = 0;
let listenNum = 0;
let cardNum = 0;
let cMoves = 0;
let starNum = 3;
let startTime;
let second = 0;
let millisecond = 0;
let arrayCard = new Array();
let clickCard = new Array(2);
let childCard = new Array(2);
let congraStr = new Array(3);
let listCard = document.getElementsByClassName("card");
let listStar = document.getElementsByClassName("stars");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * 游戏开始
 */
function game() {
    //添加每张卡片的点击事件
    for(let i=listCard.length-1;i>=0;i--) {
        Array.prototype.map.call(listCard[i].children, function(n) {
            arrayCard[i] = n.getAttribute("class");
        });
        (function(index) {
            listenNum = index;
            listCard[index].addEventListener("mousedown", listenCard);
            listCard[index].addEventListener("mouseup", upCard);
        })(i);    
    }
    shuffle(arrayCard);
    //给每张卡片更新shuffle后的class属性
    for(let i=listCard.length-1;i>=0;i--) {
        Array.prototype.map.call(listCard[i].children, function(n) {
            n.setAttribute("class", arrayCard[i]);
        });
    }
    //添加页面上方重新开始按钮的点击事件
    let restartElement = document.getElementsByClassName("restart");
    restartElement[0].addEventListener("click", function(){
        location.reload();
    });
}

/**
 * 检查卡片是否匹配
 */
function matchTest() {
    Array.prototype.map.call(clickCard[0].children, function(n) {
         childCard[0] = n.getAttribute("class");
    });
    Array.prototype.map.call(clickCard[1].children, function(n) {
        childCard[1] = n.getAttribute("class");
   });

    if(childCard[0] != childCard[1]) {
        clickCard[0].setAttribute("class", "card nomatch animated shake");
        clickCard[1].setAttribute("class", "card nomatch animated shake");
        let tempCard0 =  clickCard[0];
        let tempCard1 =  clickCard[1];
        setTimeout(function() {
            tempCard0.setAttribute("class", "card");
            tempCard1.setAttribute("class", "card");
        },1000);
       
    } else {
        clickCard[0].setAttribute("class", "card match animated rubberBand");
        clickCard[1].setAttribute("class", "card match animated rubberBand");
        clickCard[0].removeEventListener("mousedown", listenCard);
        clickCard[1].removeEventListener("mousedown", listenCard);
        clickCard[0].removeEventListener("mouseup", upCard);
        clickCard[1].removeEventListener("mouseup", upCard);
        cardNum ++;
    }
}

/**
 * 卡片翻开
 */
function listenCard() {
    if(second === 0) {
        startTime =setInterval(timer,50);
    }
    this.setAttribute("class", "card open show");  
}

/**
 * 计时
 */
function timer()
{
  millisecond=millisecond+50;
  second = (millisecond/1000).toFixed(2);
  document.getElementById('seconds').innerHTML = second;

}

/**
 *根据步数更新星星数 
 */
function moveTest() {
    if(cMoves === 14) {
        Array.prototype.map.call(listStar[0].children[2].children, function(n) {
            n.setAttribute("class", "fa fa-star-o");
        });
        starNum = 2;
    }
    if(cMoves === 30) {
        Array.prototype.map.call(listStar[0].children[1].children, function(n) {
            n.setAttribute("class", "fa fa-star-o");
        });
        starNum = 1;
    }
    if(cMoves === 40) {
        Array.prototype.map.call(listStar[0].children[0].children, function(n) {
            n.setAttribute("class", "fa fa-star-o");
        });
        starNum = 0;
    }
}

/**
 * 检查是否通过
 */
function successTest() {
    if(cardNum === 8) {
        window.clearInterval(startTime);
        congraStr[0] = "Congratulations! You won!";
        congraStr[1] = "Spend times: " + second + " seconds!";
        congraStr[2] = "With move " + cMoves + " steps and " + starNum + " stars!";
        setTimeout(function() { 
            showSuccess();
        } ,1000); 
    }
}

/**
 * 卡片翻开后的事件处理
 */
function upCard() {
    if(control === 0) {
        clickCard[control] = this;
        control ++;
    } else {
        clickCard[control] = this;
        if(clickCard[0] != clickCard[1]) {
            cMoves = ++ document.getElementsByClassName("moves")[0].innerHTML;
            matchTest();
            control = 0;
        }  
    }
    moveTest();
    successTest();
}

/**
 * 通关后显示的弹窗
 */
function showSuccess() {
    let noticeElement = document.getElementById("success");
    let replayButton = document.getElementsByClassName("replay");
    let h1 = document.createElement("h1");
    noticeElement.setAttribute("class","");
    h1.innerHTML = congraStr[0] + "<br>" + congraStr[1] + "<br>" + congraStr[2];
    noticeElement.insertBefore(h1, replayButton[0]);
    
    replayButton[0].addEventListener("click", function() {
        noticeElement.setAttribute("class","onTop hidden");
        location.reload();
    });
}

game();