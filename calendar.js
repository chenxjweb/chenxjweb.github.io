//获取当前年、月、日、星期
var current=new Date();
var year=current.getFullYear();
var month=current.getMonth();
var date=current.getDate();
current.setFullYear(year,month,1);
var firstDay=current.getDay();

var yearInput=document.getElementById('year');
var monthInput=document.getElementById('month');
yearInput.value=year;
monthInput.value=month+1;

    


var calendarArr=new Array(6);
var liArr=new Array(6);
for(var i=0;i<6;i++){
    calendarArr[i]=new Array(7);
    liArr[i]=new Array(7);
}
var arr=document.querySelectorAll('.date li');
var count=0;
for(var m=0;m<6;m++){
    for(var n=0;n<7;n++){
        liArr[m][n]=arr[count++];
    }
}

fillCalendarArr();
drawCalendar();

var up=document.querySelectorAll('.up');
var down=document.querySelectorAll('.down');
up[0].addEventListener('click',yearUp);
up[1].addEventListener('click',monthUp);
down[0].addEventListener('click',yearDown);
down[1].addEventListener('click',monthDown);

function yearUp() {
    if(year==2099)return;
    year=year+1;
    yearInput.value=year.toString();
    clearBgc();
    update();
}
function yearDown() {
    if(year==1900) return;
    year=year-1;
    yearInput.value=year.toString();
    clearBgc();
    update();
}
function monthUp() {
    if(month==11){
        month=0;
        year+=1;
        yearInput.value=year.toString();
    }
    else month=month+1;
    monthInput.value=(month+1).toString();
    clearBgc();
    update();
}
function monthDown() {
    if(month==0){
        month=11;
        year-=1;
        yearInput.value=year.toString();
    }
    else month=month-1;
    monthInput.value=(month+1).toString();
    clearBgc();
    update();
}

function update() {
    var newDate=new Date();
    newDate.setFullYear(year,month,1);
    firstDay=newDate.getDay();
    fillCalendarArr();
    drawCalendar();
}
/*
* 判断平年、闰年，返回二月天数
* */
function februaryDays(year) {
    if(year%4==0 && year%100!=0 || year%400==0)
        return 29;
    return 28;
}

/*
* 返回当月天数
* */
function getMonthDays(month) {
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
            break;
        case 1:
            return februaryDays(year);
            break;
    }
}
/*
* 填充日期数组
* */
function fillCalendarArr(){
    var preMonth=(month-1)>=0?(month-1):11;
    var preMonthDays=getMonthDays(preMonth);
    for(var a=firstDay-1;a>=0;a--){
        calendarArr[0][a]=preMonthDays;
        liArr[0][a].style.color="#7B7B7B";
        preMonthDays--;
    }
    var k=1,m,n;
    var s=1;
    var first=firstDay;
    for(var j=0;j<6;j++) {
        while(first<=6 && k<=getMonthDays(month)){
            calendarArr[j][first]=k;
            liArr[j][first].style.color="black";
            if(k==date) liArr[j][first].style.backgroundColor="#00bfff";
            if(k==getMonthDays(month)){
                m=j;
                n=first;
            }
            k++;
            if(first==6){first=0;break;}
            first++;
        }
    }
    while (m+n!=11){
        if(n==6){
            n=0;
            m++;
        }else n++;
        calendarArr[m][n]=s;
        liArr[m][n].style.color="#7B7B7B";
        s++;
    }
}
/*
* 绘制日历日期
* */
function drawCalendar() {
    for(var p=0;p<6;p++) {
        for (var q = 0; q < 7; q++){
            liArr[p][q].innerHTML = calendarArr[p][q];
        }
    }

}
function clearBgc() {
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++)
            liArr[i][j].style.backgroundColor='transparent';
    }
}
