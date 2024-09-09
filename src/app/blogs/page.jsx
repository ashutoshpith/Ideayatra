"use client";

import BlogCard from "../../components/BlogCard";
import { fetchBlogs } from "@studio/lib/queries";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { clsx } from "clsx";

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Manage focus state
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const blog = await fetchBlogs(6);
      setBlogData(blog);
      setLoading(false);
    })();
  }, []);

  const handleClick = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  // Extract unique tags from blogData
  const tags = blogData.map(blogs => blogs.tags);
  const uniqueTags = [...new Set(tags.flatMap(tagArray => Object.values(tagArray)))];

  // Filter blogs based on selected category and search query
  const filteredBlogs = blogData
    .filter((blog) => {
      const matchesCategory = selectedCategory ? blog.tags.includes(selectedCategory) : true;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='text-lg font-semibold text-gray-600'>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <meta name="description" content="IdeaYatra ermpower the next generation of thinkers, creators, and innovators." />
      <meta name="keywords" content="edtech, education, startup, upskill" />
      <meta property="og:title" content="IdeaYatra - Blogs" />
      <meta property="og:description" content="IdeaYatra ermpower the next generation of thinkers, creators, and innovators." />
      <meta property="og:image" content="/public/ideayatra.png" />
      <meta property="og:url" content="https://ideayatra.com" />
      <meta name="twitter:card" content="summary_large_image" />

    <div className="flex flex-col px-4 lg:px-[5vw] xl:px-[10vw] py-36 w-full z-0 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Side: Categories */}
        <div className="md:col-span-1 mb-8 md:mb-0 shadow-lg rounded-lg p-4">
          <div className="mb-4 flex justify-between items-center md:block">
            <h2 className="text-xl md:text-2xl font-semibold">Categories</h2>
            <button
              className={clsx(
                "md:hidden px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ease-in-out",
                isCategoryOpen ? "bg-blue-600 hover:bg-blue-700" : "bg-mainTheme2 hover:bg-text-mainTheme2-700"
              )}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              {isCategoryOpen ? 'Hide' : 'Show'} Categories
            </button>
          </div>
          <ul className={`${isCategoryOpen ? 'block' : 'hidden'} md:block space-y-2`}>
            <li
              className={`cursor-pointer p-2 rounded transition-colors shadow-sm ${!selectedCategory && 'font-bold text-white bg-mainTheme2'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </li>
            {uniqueTags && uniqueTags.map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded transition-colors shadow-sm ${selectedCategory === category && 'font-bold text-white bg-mainTheme2'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Right Side: Blog List */}
        <div className="md:col-span-3">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Blog title..."
              className={clsx(
                "w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-0",
                isFocused ? 'border-mainTheme2' : 'border-gray-300' // Set border color based on focus state
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)} // Set focus state to true when input is focused
              onBlur={() => setIsFocused(false)} // Set focus state to false when input loses focus
            />
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((val, i) => (
              <BlogCard
                key={i}
                blogId={val.slug.current}
                blogTitle={val.title}
                blogDescription={val.excerpt}
                blogImage={val.mainImage.asset.url}
                publishedAt={val.publishedAt}
                onClick={() => handleClick(val.slug.current)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
