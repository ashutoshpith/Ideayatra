"use client";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blogId, blogTitle, blogDescription, blogImage, publishedAt, pagePath, onClick }) => {

    const blogUrl = `/${pagePath}/${blogId}`;
    console.log("blog url ", blogUrl);
    
    
  return (
    <div
      key={blogId}
      class="group relative rounded-lg overflow-hidden bg-white  hover:shadow-2xl cursor-pointer"
    >
      <div class="h-40">
        <Image
          src={blogImage}
          width={"100"}
          height={"100"}
          alt="Blog"
          class="h-40 w-full object-cover object-center "
        />
      </div>
      <div class="h-1/2 p-4 ">
        <h3 class="mb-2 text-base font-semibold text-blue-800">
          <Link href={blogUrl}  class="hover:underline">  
            {blogTitle} 
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-orange-400">Published At:</span> {new Date(publishedAt).toLocaleDateString()}
        </p>
    
        <div class="flex flex-row justify-between text-xs mt-2">
          {blogDescription.length > 30 ? (
            <p>
              {blogDescription.slice(0, 100)} ...
              <span className="cursor-pointer text-blue-800 hover:underline" onClick={(e) => onClick({blogUrl})}>
                Read More
              </span>
            </p>
          ) : (
            <p>{blogDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
