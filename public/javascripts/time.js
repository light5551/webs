function startTime(time){
    r=document.getElementById('clock'),
        tmp=time;
    setInterval(function(){
        var c=tmp--,m=(c/60)>>0,s=(c-m*60)+'';
        r.textContent='Registration closes in '+m+':'+(s.length>1?'':'0')+s
        tmp!=0||(tmp=time);
    },1000);
}
