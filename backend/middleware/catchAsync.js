//generally what happens in async fn jb tk search hota h usme async error aajate 

module.exports = theFunc=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
}