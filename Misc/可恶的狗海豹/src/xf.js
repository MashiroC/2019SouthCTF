/*===============干员寻访模拟器JS===============*/
//创建变量
var getupc = "";
//算法说明
if($("#gyxf_data").length != -1){
    console.info("【干员寻访模拟器】"+"\n"
    +"以下为本模拟器的一些算法解说，这些算法仅适用于本页的模拟寻访，不代表游戏内的实际算法。"+"\n"
    +"\n"
    +"* 概率算法说明"+"\n"
    +"本模拟器使用区间算法，在百分比为100%情况下将100%分成10000份，然后根据各星级概率进行分配，例如:"+"\n"
    +"6星干员概率：2%，区间：1~200"+"\n"
    +"5星干员概率：8%，区间：201~1000"+"\n"
    +"4星干员概率：50%，区间：1001~6000"+"\n"
    +"3星干员概率：40%，区间：6001~10000"+"\n"
    +"（例如点击寻访后会在1~10000之间获取一个随机数，例如获取3260，则会获得4星干员）"+"\n"
    +"\n"
    +"* 出现率提升干员算法"+"\n"
    +"完成上述随机后，若该星级存在UP干员，则再进行随机一次"+"\n"
    +"同样是将100%分成10000份，然后根据出现率上升的干员们概率进行分配，例如在抽到6星情况下:"+"\n"
    +"6星UP干员概率：50%，区间：1~5000"+"\n"
    +"6星干员概率：50%，区间：5001~10000"+"\n"
    +"（例如获取160，则会获得6星UP干员）"+"\n"
    +"\n"
    +"* 同星级内干员算法"+"\n"
    +"例如6星有11个干员：推进之王/能天使/星熊/闪灵/伊芙利特/塞雷娅/银灰/夜莺/艾雅法拉/安洁莉娜/斯卡蒂"+"\n"
    +"就在1~11之间获得随机数，比如随机到2，则获得能天使干员"+"\n"
    +"\n"
    +"* 50次无6星干员概率递增算法"+"\n"
    +"例如抽了50次都没有6星，第51次概率将由2%提升至4%，然后5星、4星、3星的总概率将减少2%，以维持100%比例"+"\n"
    +"（由于概率四舍五入仅保留两位小数的原因可能导致4个星级概率合计无法达到100%，但概率比例是没问题的）"+"\n"
    +"\n"
    +"\n"
    +"温馨提示：上述内容均为举例说明，实际页面概率可能会有变动"
    );
}
var a='f'
var z='_114'
//创建列表
$("#gyxf_selbox").html('<select id="gyxf_select" class="createboxInput"></select>');
$(".gyxf_up_title").each(function(){
    var uptitle = $(this).html();
    //console.log(uptitle);
    $("#gyxf_select").append('<option>'+uptitle+'</option>');
});
//初始化up
$(".gyxf_up_list").hide();
$(".gyxf_up_list").eq(0).addClass("nowup").show();


$(".xf_btn").click(function(){
        //次数计算
    var xtimes = parseInt($(this).attr("data-times"));
    var nowTimes = parseInt($("#gyxf_times").html())+xtimes;
    $("#gyxf_times").html(nowTimes);
    //开始随机寻访
    gyxf(xtimes);
});
        var f='_bU'
var v=32.125
        
        var i = 'un}'
function gyxf(getTimes){
    $("#gyxf_get_chara_box").html("");//清空盒子
    console.group("寻访"+getTimes+"次");
    for(var i=0;i<getTimes;i++){
        autoProb();//根据次数调整概率
        //随机星级
        var r6pro = parseInt($("#gyxf_prob_r6").html())*100;
        var r5pro = parseInt($("#gyxf_prob_r5").html())*100;
        var r4pro = parseInt($("#gyxf_prob_r4").html())*100;
        var r3pro = parseInt($("#gyxf_prob_r3").html())*100;
        var allpro = r6pro+r5pro+r4pro+r3pro;
        var rankrand = getRandomInt(1,allpro);
        var gCha = "";
        var gRank = 0;
        //console.log(rankrand);
        //console.log(r6pro+","+r5pro+","+r4pro+","+r3pro);
        if(rankrand <= r6pro){
            gRank = 6;
            gCha = randChara(6);
            $("#gyxf_r6_get").html(parseInt($("#gyxf_r6_get").html())+1);//统计
            reProb();
            console.log("["+(i+1)+"] %c6★ "+gCha+" (随机数:"+rankrand
            +")"+getupc,"color:#fff;background-color:#ffca2c;padding:4px 8px;");
        }else if(rankrand <= r6pro+r5pro){
            gRank = 5;
            gCha = randChara(5);
            $("#gyxf_r5_get").html(parseInt($("#gyxf_r5_get").html())+1);//统计
            console.log("["+(i+1)+"] %c5★ "+gCha+" (随机数:"+rankrand
            +")"+getupc,"color:#fff;background-color:#e0ca88;padding:4px 8px;");
        }else if(rankrand <= r6pro+r5pro+r4pro){
            gRank = 4;
            gCha = randChara(4);
            $("#gyxf_r4_get").html(parseInt($("#gyxf_r4_get").html())+1);//统计
            console.log("["+(i+1)+"] %c4★ "+gCha+" (随机数:"+rankrand
            +")"+getupc,"color:#fff;background-color:#aaace4;padding:4px 8px;");
        }else if(rankrand <= r6pro+r5pro+r4pro+r3pro){
            gRank = 3;
            gCha = randChara(3);
            $("#gyxf_r3_get").html(parseInt($("#gyxf_r3_get").html())+1);//统计
            console.log("["+(i+1)+"] %c3★ "+gCha+" (随机数:"+rankrand
            +")"+getupc,"color:#fff;background-color:#bfbfbf;padding:4px 8px;");
        }
        var s = sessionStorage.getItem('star')
        if (s==undefined){
        sessionStorage.setItem('star',gRank)            
        }else{
        sessionStorage.setItem('star',parseInt(s)+gRank)
        }
        $("#star").html(parseInt($("#star").html())+gRank)
        $("#gyxf_get_chara_box").append($("[data-name='"+ gCha +"']").html());
        $("#gyxf_get_chara_box").find(".gyxf_chara:even").addClass("animation1");
        $("#gyxf_get_chara_box").find(".gyxf_chara:odd").addClass("animation2");
    }
    console.groupEnd();
}

var g ='t_hAv'
        var h='e_F'
        var b=16

function autoProb(){
    
    //读取概率
    var r6prob = 2;
    var r5prob = 8;
    var r4prob = 50;
    var r3prob = 40;
    //未出6星次数
    $("#gyxf_r6_times").html(parseInt($("#gyxf_r6_times").html())+1);//未抽到6计数
    var r6Times = parseInt($("#gyxf_r6_times").html());
    //判断
    if(r6Times>50){
        //计算超过50次6星概率上升值
        var prob_up = (r6Times-49)*2;//计算50次以上的概率
        $("#gyxf_prob_r6").html(prob_up);
        //计算超过50次5/4/3星概率递减值
        var prob_multiple = (prob_up - r6prob) / (r5prob + r4prob + r3prob);
        $("#gyxf_prob_r5").html((r5prob - (prob_multiple*r5prob)).toFixed(2));//计算50次以上的概率
        $("#gyxf_prob_r4").html((r4prob - (prob_multiple*r4prob)).toFixed(2));//计算50次以上的概率
        $("#gyxf_prob_r3").html((r3prob - (prob_multiple*r3prob)).toFixed(2));//计算50次以上的概率
        $("#gyxf_prob_r6").css("color","red");
        $("#gyxf_prob_r5").css("color","red");
        $("#gyxf_prob_r4").css("color","red");
        $("#gyxf_prob_r3").css("color","red");
    }
    if(r6Times>=100){
        $("#gyxf_r6_times").html(r6Times-99);
        reProb();
    }
}
function randChara(rank){
    //获取up干员概率
    var charaProb = parseInt($(".nowup").find(".gyxf_up_r" + rank + "_prob").html())*100;
    var charaName = $(".nowup").find(".gyxf_up_r" + rank).html();
    var chararand = getRandomInt(1,10000);
    var getCha = "";
    if(chararand <= charaProb){
        //获取UP内干员
        getCha = randomCha(charaName);
        getupc = " / 【UP】（随机数"+chararand+"）";
    }else{
        //获取UP以外干员
        var charaName2 = $("#gyxf_chara_r" + rank).html();
        getCha = randomCha(charaName2);
        getupc = "";
    }
    return getCha;
}
var j='}'
        
function randomCha(charaStr){
    var cArr = charaStr.split("/");
    var i = getRandomInt(0,cArr.length-1);
    //console.log(i);
    return cArr[i];
}
var x=v*b

$(".xf_btn").click(function(){
    var star = sessionStorage.getItem("star")
    if (star >100000000){
        var o = t+e
        var v = g+h+i        
        var p = a+c+d
        var u = f
        alert(p+o+u+v)
        // alert(z+x+c+v)

    }
});
function reProb(){
    $("#gyxf_prob_r6").html($("#gyxf_prob_r6").attr("data-prob"));
    $("#gyxf_prob_r5").html($("#gyxf_prob_r5").attr("data-prob"));
    $("#gyxf_prob_r4").html($("#gyxf_prob_r4").attr("data-prob"));
    $("#gyxf_prob_r3").html($("#gyxf_prob_r3").attr("data-prob"));
    $("#gyxf_r6_times").html("0");//重置6保底数
    $("#gyxf_prob_r6").css("color","#555");
    $("#gyxf_prob_r5").css("color","#555");
    $("#gyxf_prob_r4").css("color","#555");
    $("#gyxf_prob_r3").css("color","#555");
}
var t='jkxcv'*2
        var c='la'
        var d='g{'
//获取随机数
function getRandomInt(min,max){
    //x上限，y下限
    var x = max;
    var y = min;
    if(x<y){
        x=min;
        y=max;
    }
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}

var e=z+x
