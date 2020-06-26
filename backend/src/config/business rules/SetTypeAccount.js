
exports.validateAccountType = function(type){
   
    switch(type){
        case 'pf':
           return 'Corrente'; 
           break;
        case 'pj': 
            return 'Empresarial';
            break;
        default:
            return
    }
}

