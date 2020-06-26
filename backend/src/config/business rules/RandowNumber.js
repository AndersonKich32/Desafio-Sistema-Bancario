

exports.generateNumber =function(min, max){

    if(min === 0){
        return Math.floor(Math.random() * max)
    }else{
        return Math.floor(Math.random() * min) + max
    }
 
}


