// src/app/static-page/blogs/[slug]/page.js

import Head from "next/head";
import Image from 'next/image'
const BASE_FILE_SRC = "https://cdn.fullontravel.com/";
// Fetch blog data directly in the component for SSR
async function fetchBlogData(slug) {
  const res = await fetch(`https://api.fullontravel.com/api/blog/${slug}/detail`);
  const blog = await res.json();
  
  // If no blog data is found, throw an error to handle 404
  if (!blog) {
    throw new Error('Blog not found');
  }
  return blog;
}

const BlogDetail = async ({ params }) => {
  // Await params before using its properties
  const { slug } = await params;

  // Fetch the blog data server-side
  const blog = await fetchBlogData(slug);
  console.log(blog);
  return (
    <div>
      <Head>
        <title>{blog.seoPageTitle}</title>
        <meta name="description" content={blog.seoMetaDescription} />
        <meta name="keywords" content={blog.seoMetaKeyword} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.shortDescription} />
        <meta property="og:image" content={`https://cdn.fullontravel.com/${blog.imageUrl}`} />
        <meta property="og:url" content={`https://fullontravel.com/blog/${blog.slug}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

       <div className="readingBlog">
            <div className="customContainer">
                <div className="row">
                    <div className="col-12">
                        <div className="readblogDetails">
                            <div className="blogHead mb-3">{blog?.title}</div>
                             <div className="authorDetails">
                                <div className="authorProfileimg">
                                   <Image src={BASE_FILE_SRC +blog?.authorInfo?.imageUrl} alt={blog?.authorInfo?.name}  width={520} height={300} priority />   
                                </div>
                                <div className="authorNameDetails">
                

                                </div>
                                <div className="readBlogContent" dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  );
};

export default BlogDetail;


              
      
