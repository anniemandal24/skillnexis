export function BlogCard({post}){
    return(
        <div className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
        </div>
    );
}