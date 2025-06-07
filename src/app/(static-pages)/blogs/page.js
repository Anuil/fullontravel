"use client";
import Link from 'next/link';
import Image from 'next/image'


import "../../../assets/Style/blog.css";
import { useGetBlogCategoriesQuery, useGetBlogByCategoryQuery } from "../../../features/blogs/BlogsApiSlice";
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from "react";

const SkeletonWrapperBlog = ({ count = 4 }) => (
    <div className="row">
        {Array.from({ length: count }).map((_, i) => (
            <div className="col-md-6 mb-4" key={i}>
                <div className="blogscard skeleton-card">
                    <div className="blogImage">
                        <Skeleton height={200} width="100%" />
                    </div>
                    <div className="blogContent">
                        <div className="blogDetail">
                            <Skeleton width="60%" height={15} />
                        </div>
                        <div className="blogHead">
                            <Skeleton width="80%" height={20} />
                        </div>
                        <p>
                            <Skeleton width="90%" height={10} />
                            <Skeleton width="85%" height={10} />
                            <Skeleton width="80%" height={10} />
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const timeAgo = (dateArray) => {
    if (!dateArray || dateArray.length < 6) return "Unknown time";

    const givenDate = new Date(
        dateArray[0],  // Year
        dateArray[1] - 1,  // Month (0-based)
        dateArray[2],  // Day
        dateArray[3],  // Hour
        dateArray[4],  // Minute
        dateArray[5]   // Second
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


const ListingBlog = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedCategory(null);
    }, []);

    const { data: BlogsList, isLoading: isBlogLoading } = useGetBlogByCategoryQuery(
        selectedCategory !== null
            ? { page: 1, pageSize: 50, categoryId: selectedCategory }
            : { page: 1, pageSize: 50 }
    );

    const { data: BlogCategories, isLoading: CategoriesLoading } = useGetBlogCategoriesQuery({
        page: 1,
        pageSize: 50
    });

    

    const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";

    return (
        <div className="listingBlog anup">
            <div className="customContainer">
                <div className="row">
                    <div className="col-12">
                        <div className="blogBanner">
                            
                            <Image src="https://cdn.fullontravel.com/dev/blog.webp-714245.webp" width={1050} 
                      height={450} alt="" priority  />
                        </div>

                        {/* Bootstrap Tabs */}
                        <ul className="nav nav-pills nav-fill mb-3" id="blog-pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${selectedCategory === null ? "active" : ""}`}
                                    id="pills-all-cat-tab"
                                    type="button"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    All Categories
                                </button>
                            </li>
                            {BlogCategories?.data?.map((cat) => (
                                <li className="nav-item" role="presentation" key={cat?.id}>
                                    <button
                                        className={`nav-link ${selectedCategory === cat.id ? "active" : ""}`}
                                        id={`pills-${cat?.id}-tab`}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat?.id)}
                                    >
                                        {cat?.title}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Blog List - Dynamic Based on Selected Category */}
                        <div className="row">
                            {isBlogLoading ? <SkeletonWrapperBlog count={4} /> : (
                                BlogsList?.data?.length > 0 ? (
                                    BlogsList?.data?.map((blog) => (
                                        <div className="col-md-6 mb-4 blogItem" key={blog?.slug}>
                                            <Link href={`/blogs/${blog?.slug}`}>
                                                <div className="blogscard">
                                                    <div className="blogImage">
                                                        <Image src={BASE_IMAGE_SRC + blog?.imageUrl} alt={blog?.title} width={520} height={300} priority />
                                                    </div>
                                                    <div className="blogContent">
                                                        <div className="blogDetail">
                                                            <span className="blogWriter">{blog?.authorInfo?.name || "Anonymous"}</span> | {timeAgo(blog?.createdAt)} |
                                                            <span className="postTime"> {blog?.readTime} min read</span>
                                                        </div>
                                                        <div className="blogHead">{blog?.title}</div>
                                                        <p>{blog?.shortDescription}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>No blogs available for this category.</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingBlog;
