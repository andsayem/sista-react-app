export default helpers = {
    baseurl: function(){
    	return 'https://sista.droidit.net/'
    },
    storage: function(){
        return 'https://sista.droidit.net/'
    	//return 'https://sista.speechbd.com/'
    	//return 'https://sista.droidit.net/'
    },
    storage: function(){
        return 'https://sista.speechbd.com/storage/'
    },
    currency: function(price, symbol){
        if((symbol == 'bdt') || (symbol=="BDT") || (symbol=="tk")){
            return price +' ৳';
        }else if(symbol == 'dollar'){
            return price+' $';
        }else{
            return price+' $';
        }
    },
    api: function(param1, param2){

    }
} 