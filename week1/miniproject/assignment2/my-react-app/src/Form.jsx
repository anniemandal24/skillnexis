import {useState} from "react";
export function Form(){
    const [name,setName] = useState("");
    return(
        <div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <p>Hello, {name}!</p>
        </div>
    );
}