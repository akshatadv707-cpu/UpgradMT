

"use client";

export default function Error({error,unstable_retry}:{
error: Error & {digest?:string};
unstable_retry:()=>void;
}){
    return(
        <div>
            <h1>something went wrong {error.message}</h1>
            <button onClick={()=>unstable_retry()}>Retry</button>
        </div>);

}