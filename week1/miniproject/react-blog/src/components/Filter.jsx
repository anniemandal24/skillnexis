export function Filter({category,setCategory}){
    return(
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="backend">Backend</option>
        </select>
    );
}