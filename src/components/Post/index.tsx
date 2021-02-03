import st from './post.module.scss';

const Post = ({post}: {post: IPost}) => {

  return (
    <div className={st.post}>
      <a href={post.url} target={post.target}>
        <div className={st.row}>
          <span className={st.category}>{post.category}</span>
          <span className={st.date}>{post.date}</span>
        </div>
        <h4 className={st.title}>{post.title}</h4>
        <p className={st.slug}>{post.url}</p>
      </a>
    </div>
  );
}

export default Post;
