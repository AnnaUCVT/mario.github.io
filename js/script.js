blocks=["img/block1.png","img/block2.png","img/block3.png","img/block4.png","img/block5.png","img/block6.png"];
var hearts=5;
var pole_blocks=[]; //блок поля (0-кирпич, 1-вопрос, 2-листья, 3-песок, 4-вода, 5-трава)
var pole_barrier=[]; //блок барьер (1-кирпич, 2-мостик)
var indBlock_old=5;
var blockItem=0;
var rows=1;
var steps=0;
var n=1; //номер ячейки верхнего ряда, где будут отображаются собранные монетки
var money=[ ];
for (i = 1; i < 16; i++) { //заполняем массив монеток изначально нулями
    money[i] = 0; //0-пусто,1-монетка
}

for (i=0;i<17;i++){
    pole_barrier[i]=0;
}
for(i=1;i<6;i++){ //сердечки
    idImg=document.getElementById('heart'+i);
    idImg.src="img/heart_full.png";
}
pole0_0.src="img/block6.png"; //поле
pole0_16.src="img/block6.png";
pole_blocks[0]=5;
pole_blocks[16]=5;
for (i=1;i<16;i++){ 
    idImg=document.getElementById('pole0_'+i);
    indBlock=Math.floor(Math.random()*5);
    while (indBlock==indBlock_old){
        indBlock=Math.floor(Math.random()*5);
    }
    idImg.src=blocks[indBlock];
    pole_blocks[i]=indBlock;
    if(indBlock==0){
        idImg=document.getElementById('pole1_'+i);
        idImg.src=blocks[indBlock];
        pole_barrier[i]=1;
    }
        indBlock_old=indBlock;
    }
pole1_0.src="img/mario_stop.gif";
document.addEventListener('keydown',mario_move); //слушатель клавиатуры
function mario_move(event){
//движение Марио
if(hearts==0){
    info.innerHTML="Игра окончена! Вы проиграли!";
    idImg=document.getElementById('pole1_'+steps);
    idImg.src="img/mario_stop.gif";
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);
    document.removeEventListener();
}
   if(steps>=16){
    steps=16;
    }else{
    switch(event.key){
        case 'ArrowRight':
            if (pole_barrier[steps+1] != 1 && rows==1){           
        idImg=document.getElementById('pole'+rows+'_'+steps);
        idImg.src="";
        steps++;
          idImg=document.getElementById('pole'+rows+'_'+steps);
        idImg.src="img/mariorunning.gif";}
        if (rows==2){
            idImg=document.getElementById('pole'+rows+'_'+steps);
            idImg.src="img/spacer.gif";
            steps++;
    //дальше проверяем – если перед игроком НЕ мосток или кирпич опускаемся на нижнюю строку и проверяем блок под ногами, если нет –– переходим по нему и проверяем, есть ли монетка,
            if (pole_barrier[steps] != 2 && pole_barrier[steps] != 1 ){
                rows=1;
                //checkBlock();
            }
            else {
                rows=2;
                getCoin();
            }
            idImg = document.getElementById('pole'+rows+'_' + steps);
            idImg.src="img/mariorunning.gif";
         }
            break;
     case 'ArrowUp':
        idImg = document.getElementById('pole' + rows + '_' + steps);
        idImg.src = "img/spacer.gif";
        rows = 2;
        idImg = document.getElementById('pole' + rows + '_' + steps);
        idImg.src = "img/mariorunning.gif";
        getCoin();
        break;  
    case 'Shift':
            idImg = document.getElementById('pole' + rows + '_' + steps);
            idImg.src = "";
            steps++;
            if ((rows==2&&pole_barrier[steps] != 1&& pole_barrier[steps] != 2)|| steps==16){
                rows=1;
            } else{
             rows = 2;}
            idImg = document.getElementById('pole' + rows + '_' + steps);
            idImg.src = "img/mariorunning.gif";  
            if(rows==2){ // проверяем, есть ли монетка, только если находимся во второй строке
                getCoin();
            }
            break;
        case 'ArrowDown':
            if(n>1){
            n--;
            idImg=document.getElementById('coin'+n);
            idImg.src="";
            idImg=document.getElementById('pole1_'+(steps+1));
            idImg.src="img/most.png";
            pole_barrier[steps+1]=2;
            }else{
                info.innerHTML="У вас нет монеток для постройки моста";
            }
            break;  
}
}
   checkBlock();
}
for(i=1;i<6;i++){
    indCoin=Math.floor(Math.random()*15+1);
    idImg=document.getElementById('pole2_'+indCoin);
    idImg.src="img/coin.gif";
    money[indCoin]=1;   
}

function checkBlock(){ //определяем блок под ногами игрока
    if(rows==1){
        blockItem=pole_blocks[steps];
        switch(blockItem){
            case 5: //блок травы
                if (steps!=0 && hearts!=0){
                         pole1_16.src="img/mario_jumping.gif";
                         info.innerHTML="Уровень пройден!"
                         clearInterval(interval1);
                         clearInterval(interval2);
                         clearInterval(interval3);
                         document.removeEventListener();
                }
            break;
            case 4: //блок воды - теряет жизнь
                idImg=document.getElementById('heart'+hearts);
                idImg.src="img/heart_empty.png";
                hearts--;
                break;
            case 2: //листья - возврат к старту
                idImg=document.getElementById('pole1_'+steps);
                idImg.src="";
                steps=0;
                pole1_0.src="img/mariorunning.gif";
                break;
            case 1: //вопрос - превращается в случайный блок
                rndBlock=Math.floor(Math.random()*4+1);
                idImg=document.getElementById('pole0_'+steps);
                idImg.src=blocks[rndBlock];
                pole_blocks[steps]=rndBlock;
                checkBlock();
                break;
        }
    }
}
function getCoin(){
    if(money[steps]==1){ 
//если в том месте, куда перемещаемся, монетка
        idImg1=document.getElementById('coin'+n);
        idImg1.src="img/bonus.png";
        n++;
money[steps]=0;
/*если монетку в этой клетке уже собрали, нельзя снова прыгнуть на то же (уже пустое) место и снова получить монетку*/
    }   }

//облака
c1.style.left=(document.documentElement.clientWidth-c1.width)+"px";
c1.style.top="200px";

c2.style.left=(document.documentElement.clientWidth-c2.width)+"px";
c2.style.top="350px";

var x1=parseInt(document.documentElement.clientWidth-c1.width);
var x2=parseInt(document.documentElement.clientWidth-c2.width);
interval1=setInterval(move_cloud1,30)//большое облако
interval2=setInterval(move_cloud2,10)//маленькое облако

function move_cloud1(){
    if(x1+c1.width<0){
        x1=parseInt(document.documentElement.clientWidth-c1.width);
    }
    x1=x1-1;
    c1.style.left=x1+"px";
}

function move_cloud2(){
    if(x2+c2.width<0){
        x2=parseInt(document.documentElement.clientWidth-c2.width);
    }
    x2=x2-1;
    c2.style.left=x2+"px";
}
//отсчёт времени
interval3=setInterval(time_count,1000);
var t=60;
function time_count(){
    t--;
    timing.innerHTML=t;
    if(t==0){
        info.innerHTML="Игра окончена! Время вышло";
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        document.removeEventListener('keydown',mario_move);
    }
}