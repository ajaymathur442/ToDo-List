 module.exports= getDate; // exports the function
    //setting up date
    function getDate(){
    var today =new Date();
    var options ={
    weekday:"long",
    day:"numeric",
    month:"long"
    };
    var day=today.toLocaleDateString("en-US",options);
    return day;
}