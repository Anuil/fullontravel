import "../../assets/Style/blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useDeleteCommentMutation, useGetABlogQuery, useGetCommentsQuery, useGetUserLikeQuery, useLikeBlogMutation } from "../../features/blogs/BlogsApiSlice";
import SkeletonWrapper from "../../Components/SkeletonWrapper";
import { toast, Bounce } from "react-toastify";
import { useUserState } from "../../features/user/userstateSlice";
import { useEffect, useState } from "react";

import HeartFilledIcon from "../../assets/images/svg/heart-fill-svg.svg"
import HeartIcon from "../../assets/images/svg/heart-svg.svg"
import CommentIcon from "../../assets/images/svg/comment-svgr.svg"
import { Helmet } from 'react-helmet';

const BASE_FILE_SRC = "https://cdn.fullontravel.com/";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";

const ReadingBlog = () => {

    const { user } = useUserState()

    const { blogId } = useParams();
   
    const [blogIds, setBlogIds] = useState(null);
    const [IsDeleting, setIsDeleting] = useState({ id: null, delete: false })
    const { data: BlogData, isLoading: BlogLoading, refetch: RefetchBlog } = useGetABlogQuery({
        blogId: blogId
    })
    useEffect(() => {
        console.log(BlogData);
        if (BlogData) {
            setBlogIds(BlogData?.id);
            refetchUserLike();
            refetchComments();
        }
    },[BlogData]);
    console.log(blogIds);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [likeBlog, { isLoading: LikingBlog }] = useLikeBlogMutation()
    const handleBlogLike = async (value) => {
        try {
            const { data, error } = await likeBlog({
                blogId: blogIds,
                userId: user?.id,
                body: {
                    like: value
                }
            })

            if (data) {
                RefetchBlog()
                // toast.success("Blog updated", {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored",
                //     transition: Bounce,
                // });
            }

            if (error) {
                throw error
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "An Error Occured, Please try again", {
                posihandleCommentPosttion: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    // const [unlikeBlog, { isLoading: UnlikingBlog }] = useUnlikeBlogMutation()
    // const handleBlogUnLike = async () => {
    //     try {
    //         const { data, error } = await unlikeBlog({
    //             blogId: blogId,
    //             userId: user?.id,
    //             body: {
    //                 like: false
    //             }
    //         })

    //         if (data) {
    //             RefetchBlog()
    //             toast.success("Blog Unliked", {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //             });
    //         }

    //         if (error) {
    //             throw error
    //         }
    //     } catch (error) {
    //         toast.error(error?.data?.errorMessage || "An Error Occured, Please try again", {
    //             posihandleCommentPosttion: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //             transition: Bounce,
    //         });
    //     }
    // }




    const [comment, setComment] = useState("")
    const [addComment, { isLoading: Commenting }] = useAddCommentMutation()

    const { data: UserLike, isLoading: LoadingUserLike, refetch: refetchUserLike } = useGetUserLikeQuery({
        blogId: blogIds,
        userId: user?.id
    }, { enabled: false })

    const { data: BlogComments, refetch: refetchComments } = useGetCommentsQuery({
        page: 1,
        pageSize: 10,
        blogId: blogIds
    }, { enabled: false })
    const handleCommentPost = async (e) => {
        e.preventDefault()
        try {
            const { data, error } = await addComment({
                blogId: blogIds,
                userId: user?.id,
                body: {
                    comment: comment
                }
            })

            if (data) {
                // RefetchBlog()
                refetchComments()
                toast.success("Comment has been sent for approval", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });

                setComment("")
            }

            if (error) {
                throw error
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "An Error Occured, Please try again", {
                posihandleCommentPosttion: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }


    const [deleteComment, { isLoading: DeletingComment }] = useDeleteCommentMutation()
    const handleCommentDelete = async (commentId) => {
        try {
            const { data, error } = await deleteComment({
                blogId: blogIds,
                userId: user?.id,
                commentId: commentId
            })

            if (data) {
                // RefetchBlog()
                refetchComments()
                toast.success("Blog comment deleted", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }

            if (error) {
                throw error
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "An Error Occured, Please try again", {
                posihandleCommentPosttion: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    const timeAgo = (dateArray) => {
        // Convert the array into a JavaScript Date object (year, month (0-based), day, hour, minute, second)
        const givenDate = new Date(
            dateArray?.[0],  // Year
            dateArray?.[1] - 1,  // Month (0-based)
            dateArray?.[2],  // Day
            dateArray?.[3],  // Hour
            dateArray?.[4],  // Minute
            dateArray?.[5]   // Second
        );

        const now = new Date();
        const diffInSeconds = Math.floor((now - givenDate) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays} days ago`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} months ago`;
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} years ago`;
    };

    return (
        <>
           <Helmet>
                <title>{BlogData?.seoPageTitle}</title>
                <link rel="canonical" href={`https://fullontravel.com/blog/${BlogData?.slug}`} />
                <meta name="description" content={BlogData?.seoMetaDescription} />
                <meta name="keywords" content={BlogData?.seoMetaKeyword} />
        
                <meta property="og:title" content={BlogData?.title} />
                <meta property="og:description" content={BlogData?.shortDescription} />
                <meta property="og:image" content={BASE_IMAGE_SRC + BlogData?.imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
            </Helmet>
            <div className="readingBlog">
                <div className="customContainer">
                    <div className="row">
                        <div className="col-12">
                            <div className="readblogDetails">
                                {
                                    BlogLoading ? <>
                                        <SkeletonWrapper height="50px" />
                                    </> : <div className="blogHead mb-3">{BlogData?.title}</div>
                                }

                                {/* <div className="blogSubHead">A Spiritual Reflection on the Contrasting Voices of Kamala Harris and Donald Trump</div> */}
                                <div className="authorDetails">
                                    <div className="authorProfileimg">
                                        {
                                            BlogLoading ? <SkeletonWrapper  height="60px" width="60px"/> : 
                                            BlogData?.authorInfo?.imageUrl ? <img src={BASE_FILE_SRC +BlogData?.authorInfo?.imageUrl} alt={BlogData?.authorInfo?.name} /> : <img src="https://cdn.fullontravel.com/dev/user.png-113144.png" alt="" />
                                        }
                                    </div>
                                    <div className="authorNameDetails">
                                        {
                                            BlogLoading ? <SkeletonWrapper width="100px" /> : <div className="authorName">{BlogData?.authorInfo?.name}</div>
                                        }

                                        {
                                            BlogLoading ? <SkeletonWrapper height="20px" width="300px" /> : <div className="authorDetails">
                                                {/* <span className="publish">Published in <span className="publishName">{BlogData?.blogCategoryInfo?.title}</span></span> */}
                                                <span className="publishTime">  {BlogData?.readTime} min read | </span>
                                                <span className="publishDay">{timeAgo(BlogData?.createdAt)}</span>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="likesANDother">
                                <div className="likesANDcomment" style={{ gap: "10px" }}>
                                    {
                                        BlogLoading ? <SkeletonWrapper width="50px" /> : <div type="button" className="likes" >
                                            <div className="likeSvg">
                                                {/* <svg type="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                                </svg>  */}
                                                {
                                                    LoadingUserLike ? <SkeletonWrapper width="20px" /> : UserLike?.like ? <>
                                                        {
                                                            LikingBlog ? <FontAwesomeIcon icon={faSpinner} spin /> : <img src={HeartFilledIcon} height={25} width={25} onClick={() => handleBlogLike(false)} />
                                                        }

                                                    </> :
                                                        <>
                                                            {
                                                                LikingBlog ? <FontAwesomeIcon icon={faSpinner} spin /> : <img src={HeartIcon} height={25} width={25} onClick={() => handleBlogLike(true)} />
                                                            }

                                                        </>
                                                }
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg> */}
                                            </div>
                                            <div className="alllikes">{BlogData?.likes >= 1000 ? (BlogData?.likes / 1000).toFixed(1) + "K" : BlogData?.likes}</div>

                                        </div>
                                    }

                                    {
                                        BlogLoading ? <SkeletonWrapper width="50px" /> : <div className="comment" data-bs-toggle="offcanvas" data-bs-target="#commentsidebar" aria-controls="commentsidebar">
                                            <div className="commentSvg">
                                                <img src={CommentIcon} height={21} width={21} />
                                            </div>
                                            <div className="allComment" style={{ paddingLeft: "4px" }}>{BlogComments?.total}</div>
                                        </div>
                                    }

                                </div>
                                {/* <div className="others">
                                    <div className="dropdown">
                                        <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="readBlogImg">
                                <img src="https://i.pinimg.com/originals/28/fa/d1/28fad17aba692fa7aa0f8371b4674a28.jpg" alt="" />
                                <div className="imgBrand">
                                    Image source: <a href="https://i.pinimg.com">Pinimg</a>
                                </div>
                            </div> */}

                            {
                                BlogLoading ?
                                    <>
                                        <SkeletonWrapper height="200px" />
                                        <SkeletonWrapper height="600px" />

                                    </> : <div className="readBlogContent" dangerouslySetInnerHTML={{ __html: BlogData?.content }}>
                                    </div>
                            }

                        </div>
                        {/* <div className="col-12">
                            <div className="tourCategory">
                                <div className="place"><span>Dubai</span></div>
                                <div className="place"><span>Singapore</span></div>
                                <div className="place"><span>North East India</span></div>
                                <div className="place"><span>Thailand</span></div>
                                <div className="place"><span>Kashmir</span></div>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
            </div>
           {/* <div className="listsimilarBlog">
                <div className="customContainer">
                    <div className="row">
                        <div className="col-12">
                            <div className="listHead">Similar Blog</div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="blogscard">
                                <div className="blogImage">
                                    <img src="https://i.pinimg.com/originals/28/fa/d1/28fad17aba692fa7aa0f8371b4674a28.jpg" alt="" />
                                </div>
                                <div className="blogContent">
                                    <div className="blogDetail">
                                        <span className="blogWriter">Shuvra Saha</span> | October 10, 2024 | <span className="postTime">4 min read</span>
                                    </div>
                                    <div className="blogHead">The Big Brand Theory | Freshness, Flavour and Innovation. That’s Bakingo!</div>
                                    <p>Read more about the story of three engineering students who baked their way into the hearts of millions of Indians.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="blogscard">
                                <div className="blogImage">
                                    <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D" alt="" />
                                </div>
                                <div className="blogContent">
                                    <div className="blogDetail">
                                        <span className="blogWriter">Shuvra Saha</span> | September 11, 2024 | <span className="postTime">4 min read</span>
                                    </div>
                                    <div className="blogHead">The Big Brand Theory | A Scoop of Naturals: How a Fruit Seller’s Legacy Created an Iconic Brand</div>
                                    <p>Starting as a small eatery in Juhu in 1984, Naturals soon blossomed into a treasured ice cream parlor known for…</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="blogscard">
                                <div className="blogImage">
                                    <img src="https://img.freepik.com/premium-photo/amazing-landscape-with-man-taking-photos-with-orange-shirt-standing-top-green-mountain_68060-6.jpg" alt="" />
                                </div>
                                <div className="blogContent">
                                    <div className="blogDetail">
                                        <span className="blogWriter">Shuvra Saha</span> | October 10, 2024 | <span className="postTime">4 min read</span>
                                    </div>
                                    <div className="blogHead">The Big Brand Theory | Freshness, Flavour and Innovation. That’s Bakingo!</div>
                                    <p>Read more about the story of three engineering students who baked their way into the hearts of millions of Indians.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="commentsidebar" aria-labelledby="commentsidebarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="commentsidebarLabel">Responses ({BlogComments?.total})</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="commentTextbar">
                        <div className="commentPerson">
                            <div className="profileImg">
                             
                                {
                                    user?.profileImageUrl ? <img src={BASE_FILE_SRC + user?.profileImageUrl} alt={user?.firstName} /> : <img src="https://cdn.fullontravel.com/dev/user.png-113144.png" alt="" />
                                }
                            </div>
                            
                        </div>
                        <form method="POST" onSubmit={handleCommentPost}>
                            <div className="textarea">
                                <textarea
                                    name=""
                                    id=""
                                    className="form-control"
                                    placeholder="What are your thoughts?"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                ></textarea>
                            </div>
                            <div className="textareaButton">
                                <div className="respondbutton">
                                    {/* <button className="cancelButton" type="burr" disabled={Commenting}>Cancel</button> */}
                                    <button className="respondButton" type="submit" disabled={Commenting}>
                                        {Commenting ? "Posting..." : "Post"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="relevant">
                        {/* <div className="dropdown">
                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Most Relevant
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                            </ul>
                        </div> */}
                    </div>
                    <div className="allComments">
                        {
                            BlogComments?.data?.map((comment) => {
                                return (
                                    <div className="commentPerson" key={comment?.id}>
                                        <div className="personDetail">
                                            <div className="personProfile">
                                                {
                                                    comment?.userDto?.profileImageUrl ? <img src={BASE_FILE_SRC + comment?.userDto?.profileImageUrl} alt="" width={40} height={40} style={{ border: "1px solid #f37002", borderRadius: "50%" }} /> : <img src="https://cdn.fullontravel.com/dev/user.png-113144.png" alt="" />

                                                }
                                        
                                                <h4 style={{ height: "fit-content", fontSize: "15px", color: "#777373" }}>
                                                    {comment?.userDto?.firstName}
                                                </h4>
                                            </div>
                                            <div className="deleteCont">

                                                {
                                                    IsDeleting.id === comment?.id && IsDeleting.delete ? <>
                                                        <FontAwesomeIcon icon={faXmark} onClick={() => setIsDeleting(false)} cursor="pointer" />
                                                        {
                                                            DeletingComment ? <FontAwesomeIcon icon={faSpinner} spin cursor="pointer" /> : <FontAwesomeIcon icon={faCheck} onClick={() => handleCommentDelete(comment?.id)} cursor="pointer" />
                                                        }
                                                    </> : <>
                                                        {
                                                            user?.id === comment?.userDto?.id ? <FontAwesomeIcon icon={faTrash} onClick={() => setIsDeleting({
                                                                ...IsDeleting,
                                                                id: comment?.id,
                                                                delete: true
                                                            })} cursor="pointer" /> : ""
                                                        }

                                                    </>
                                                }
                                            </div>

                                        </div>
                                        <div className="comment">
                                            <p>
                                                {comment?.comment}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadingBlog