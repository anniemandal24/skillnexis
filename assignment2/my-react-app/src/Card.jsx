export function Card({name,title,bio}){
    return(
        <div className="card">
            <h2>{name}</h2>
            <h3>{title}</h3>
            <p>{bio}</p>
        </div>
    )
}