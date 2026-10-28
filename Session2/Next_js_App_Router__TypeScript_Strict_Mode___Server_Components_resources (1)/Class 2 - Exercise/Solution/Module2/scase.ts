

type RequestState=|{status:"Loading"} |{status:"Success",data: User }|{status:"Error",error:Error} |{status:"Idle"};

interface User{
    name:String;
}

function assertNever(value: never): never {
    throw new Error(`Unhandled discriminable union member: ${JSON.stringify(value)}`);
}

function handlerequest(state:RequestState):string{
switch(state.status){
    case "Loading":
        return ("page is loading");
    
    case "Success":{
        return (`page is loaded with data: ${state.data.name}`);
    }
    case "Error":{
        return (`page has an error: ${state.error.message}`);
    }
    /*case "Idle":{
        return ("page is idle");
    }*/

    default:{
    return assertNever(state);
    }
}
}

console.log(handlerequest({status:"Idle"}));