
exports.credit = function(score){
   
  if(score <= 1 ){
    return{check:null, card:null}
  }
  else if(score <= 5){
    return{check: 1000, card: 250}
  }
  else if(score <= 8){
    return{check: 2000, card: 2000}
  }
  else if(score === 9){
    return{check: 5000, card: 15000}
  }
  
}