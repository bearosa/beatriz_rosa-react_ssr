import cls from "classnames";
import { shallowEqual, useSelector } from "react-redux";
import { useState } from "react";

import Post from "../Post";

import st from './posts-list.module.scss';
import Pagination from "../Pagination";

const PostsList = ({className}: {className: string}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPosts: readonly IPost[] = useSelector(
    (state: SearchState) => state.filteredPosts,
    shallowEqual
  )

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={cls(st.list, className)}>
      {currentPosts?.length > 0 ? 
          <>
            {
              currentPosts.map((post, index) => {
                return <Post post={post} key={index} />
              })
            }
            <Pagination 
              currentPage={currentPage} 
              itemsPerPage={postsPerPage} 
              totalItems={filteredPosts.length}
              pageBound={5} 
              setCurrentPage={setCurrentPage} />
          </>
        :
          <div className={st.emptyState}>
            <div className={st.emptyStateText}>
              <h2>Haven't found what you are looking for?</h2>
              <p>Please give it another try!</p>
            </div>
            <div className={st.emptyStateImage}>
              <img src="https://prd-cdn-talkdesk.talkdesk.com/talkdesk_com/2018/03/23112845/illustration_empty-state-640x653.png" srcSet="https://prd-cdn-talkdesk.talkdesk.com/talkdesk_com/2018/03/23112845/illustration_empty-state-640x653.png 640w, https://prd-cdn-talkdesk.talkdesk.com/talkdesk_com/2018/03/23112845/illustration_empty-state.png 1280w" sizes="(max-width: 640px) 640w, 100vw" alt="There are no results!"></img>
            </div>
          </div>
      }
    </div>
  );
}

export default PostsList;
