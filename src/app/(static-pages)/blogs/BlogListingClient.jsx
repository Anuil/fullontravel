// src/app/(static-pages)/blogs/BlogListingClient.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";

export default function BlogListingClient({ blogs, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog?.categoryId === selectedCategory)
    : blogs;

  return (
    <div className="listingBlog">
      <div className="customContainer">
        <div className="blogBanner">
          {/* <Image src="https://cdn.fullontravel.com/dev/blog.webp-714245.webp" alt="Blog Banner" width={1050} 
                      height={450} /> */}
        </div>

        {/* Category Tabs */}
        <ul className="nav nav-pills nav-fill mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${selectedCategory === null ? "active" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>
          </li>
          {categories?.map((cat) => (
            <li className="nav-item" key={cat.id}>
              <button
                className={`nav-link ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Blog List */}
        <div className="row">
          {filteredBlogs?.map((blog) => (
            <div className="col-md-6 mb-4 blogItem" key={blog.slug}>
              <Link href={`/blog/${blog.slug}`}>
                <div className="blogscard">
                  <div className="blogImage">
                    {/* <Image
                      src={BASE_IMAGE_SRC + blog.imageUrl}
                      alt={blog.title}
                      width={600}
                      height={400}
                      style={{ width: "100%", height: "auto" }}
                    /> */}
                  </div>
                  <div className="blogContent">
                    <div className="blogDetail">
                      <span className="blogWriter">{blog?.authorInfo?.name || "Anonymous"}</span> |{" "}
                      <span className="postTime">{blog?.readTime} min read</span>
                    </div>
                    <div className="blogHead">{blog.title}</div>
                    <p>{blog.shortDescription}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
