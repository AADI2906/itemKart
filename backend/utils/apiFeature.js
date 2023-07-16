class ApiFeatures{
    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    //yaha pe search pagination and also filter bnayenge...
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword ,
                $options: "i",
            },
        }:{}

        this.query = this.query.find({...keyword});
        return this; // yeh pura obj return krdiya
    }

    //time to filter elements

    filter(){
        /*ab dekho querystr mai se hume keyword wagera hatana h so that we could work upon category filtering*/

        const queryCopy = {...this.queryStr};
        // console.log(queryCopy); before removing fields
        const removeFields = ["keyword" , "page" , "limit"];

        // filter for price and rating 
        //we gonna use lower than and greater than fn
        //lt and gt originally should have a dollar sign so we nee dto replace

        //warning mistake:: i stringified first and then deleted which actually deleted from the original...
        // hence first delete and then stringify
        
        removeFields.forEach((key)=> delete queryCopy[key]);
        let querycpy = JSON.stringify(queryCopy);
        querycpy = querycpy.replace(/\b(gt|gte|lt|lte)\b/g , (key)=>`$${key}`);

        this.query = this.query.find(JSON.parse(querycpy));
        return this;
        
    }


    pagination(maxProducts){
        let currpage = Number(this.queryStr.page) || 1; //mtlb url m jitni v queries h unme se ek query hogi page naam ki
        const skipp = maxProducts * (currpage - 1); // suppose agr m first page pr hu toh ek v skip nhi krni 1 se dikhani hai
        //limit mtlb to show x amount of product and skip some y products
        this.query = this.query.limit(maxProducts).skip(skipp);
        return this;
    }
    
}

module.exports = ApiFeatures;