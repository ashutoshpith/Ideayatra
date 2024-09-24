'use client'
import { useParams } from 'next/navigation';
import { getJsTutorialPostBySlug } from "@studio/lib/queries";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { urlForImage } from '../../../../../sanity/lib/image'
import { PortableText } from "@portabletext/react";


const renderChildren = (children) => {
    return children.map((child, index) => {
      if (child.marks && child.marks.includes('strong')) {
        return <strong key={index}>{child.text}</strong>; // For bold text
      } else if (child.marks && child.marks.includes('em')) {
        return <em key={index}>{child.text}</em>; // For italic text
      }
      return <span key={index}>{child.text}</span>; // Default span for plain text
    });
  };

const components = {
    types: {
      block: ({ value }) => {
        const { children } = value;
  
        switch (value.style) {
          case 'h1':
            return <h1 className='p-4'>{renderChildren(children)}</h1>;
          case 'h2':
            return <h2 className='p-4 font-extrabold text-red-500'>{renderChildren(children)}</h2>;
          case 'h3':
            return <h3 className='p-4 font-extrabold text-mainTheme2'>{renderChildren(children)}</h3>;
          case 'normal':
            return <p className='p-4 text-mainTheme3'>{renderChildren(children)}</p>;
          default:
            return <p className='p-4'>{renderChildren(children)}</p>;
        }
      },
      list: {
        bullet: ({ children }) => {
          return <ul>{children}</ul>;
        },
        number: ({ children }) => {
          return <ol>{children}</ol>;
        },
      },
      listItem: ({ children }) => {
        return <li>{children}</li>;
      },
    image: ({ value }) => {
            return (
              <div>
                <Image
                  src={urlForImage(value?.asset?._ref)}
                  alt={value.alt || 'Image'}
                  layout="responsive"
                  width={1200}
                  height={675}
                  className='p-2'
                />
              </div>
            );
          },
    },
    marks: {
        strong: ({ children }) => <strong className='px-4 text-mainTheme3'>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
      },
  };


const JsBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Ensure slug is available before fetching

    (async () => {
      const blogData = await getJsTutorialPostBySlug(id);
      setBlog(blogData);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='text-lg font-semibold text-gray-600'>Loading...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='text-lg font-semibold text-gray-600'>Javascript post not found</span>
      </div>
    );
  }

  const seoTitle = blog.seo?.metaTitle || blog.title || 'Idea Yatra Blog'
  const seoDescription = blog.seo?.metaDescription || 'Default description for IdeaYatra blog.'
  const seoBlogUrl = `https://ideayatra.com/blogs/${blog.slug?.current}`
  const seoBlogImageUrl = blog.mainImage?.asset?.url || 'https://ideayatra.com/default-image.jpg'
  const seoBlogKeyword = blog.seo.metaKeywords.join(", ")

  console.log("tutorial ", blog);
  

  return (
    <>
      <meta name="description" content={seoDescription}/>
      <meta name="keywords" content={seoBlogKeyword} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoBlogImageUrl} />
      <meta property="og:url" content={seoBlogUrl} />
      <meta name="twitter:card" content="summary_large_image" />

      
      <div className="flex flex-col px-4 md:px-8 lg:px-12 py-10 lg:py-44">
  <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center py-6 px-4">
      {blog.title}
    </h1>
    
    {blog.mainImage?.asset?.url && (
      <div className="relative w-full h-60 md:h-80 lg:h-96">
        <Image
          src={blog.mainImage?.asset?.url}
          alt={blog.mainImage?.alt || blog?.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
    )}

    <div className="px-6 md:px-8 py-6">
      {/* Aligning author, designation, and published date on the same line */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-600 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Author:</span>
          <span className="text-sm md:text-base text-gray-800">{blog.author.name}</span>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <span className="font-semibold">Designation:</span>
          <span className="text-sm md:text-base text-red-500">{blog.author.bio}</span>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <span className="font-semibold">Published:</span>
          <span className="text-sm md:text-base">{new Date(blog.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-6">
        {/* Rendering PortableText content with customized styles */}
        <PortableText value={blog.body} components={components} />
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default JsBlog;