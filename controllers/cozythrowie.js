//////////// Cozy Throwie Controller ///////////////
const { model } = require('mongoose');
const Blog = require('../models/blog');

///////////// Importing Dependencies ///////////////
const { response } = require('express');
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const { zodResponseFormat } = require("openai/helpers/zod");
const { z } = require("zod");

//////////////// testApi function ///////////////////////////
exports.testApi = (req, res) => {
    res.send(`<body style="background: black; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   Cozy Throwie Routes   👽</h1> \n 
        </div><div style="width: 30%; height: auto"></div>
        </body>`);
};

//////////////// Get Cozy Blogs function ///////////////////////////

exports.getCozyBlogs = async (req, res) => {
  console.log('Getting Cozy Blogs');
  try {
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(2); // Fetch the last 10 posts
      console.log('Blogs:', ...blogs);
      res.json({ message: blogs });
  } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};


// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////// Structured Output Testing ///////////////////////////////
///////////////////////////// Create a Zod Schema for the Response ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const blogSchema = z.object({
    titleMain: z.string(),
    descriptionSummary: z.string(),
    featuredPhotoDescription: z.string(),
    facebook: z.object({
      text: z.string(),
      photoDescription: z.string(),
    }),
    instagram: z.object({
      text: z.string(),
      photoDescription: z.string(),
    }),
    twitter: z.object({
      text: z.string(),
      photoDescription: z.string(),
    }),
    pinterest: z.object({
      text: z.string(),
      photoDescription: z.string(),
    }),
    tags: z.array(z.string()),
    sections: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        photoDescription: z.string(),
        productDescription: z.array(z.object({
            description: z.string(),
            productUrl: z.string(),
            productKeywords:  z.array(z.string()),
            
        })),
      }),
    ),
    
  });


// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////// Structured Output Testing /////////////////////////////
//////////////////////////////////// Use Schema in Ai Call ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


createBlog = async (req, res) => {
    console.log('🚀 Creating Blog 🚀');
    const createBlog = await openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
          {role: "system", content: "You are a content creator for Cozy Throwie, a blog that focuses on cozy living, home decor, and lifestyle. You are responsible for creating engaging content that resonates with your audience. Your goal is to create content that inspires and informs your readers. You are passionate about creating a warm and inviting space for your readers to relax and unwind. You are dedicated to providing valuable information and resources that help your readers live a cozy and comfortable life. You blogs will include descriptions of Amazon products that correlate to the section description and Keywords (I will provide Links to these) , and you will earn a commission on any sales generated through the blog. You are excited to share your love of cozy living with your readers and help them create a warm and inviting space in their own homes. Each Blog Will start with a Title, a summary description, feature photo, followed by Sections which include a paragraph of text, a photo, and a descriptions of correlating Amazon products. All photos should be 16:9 aspect ratio and high quality. You will also create social media post for Facebook, Instagram, X (Twitter) and Pinterest. Please include any applicable tags keep inline with each platforms content requirements. Include Tags in which users can search for the blog.  Return your results in this JSON format: {titleMain: 'Title', descriptionSummary: 'Description', featuredPhotoDescription: 'Photo Description', facebook: {text: 'Text', photoDescription: 'Photo Description'}, instagram: {text: 'Text', photoDescription: 'Photo Description'}, twitter: {text: 'Text', photoDescription: 'Photo Description'}, pinterest: {text: 'Text', photoDescription: 'Photo Description'}, sections: [{title: 'Title', description: 'Description', photoDescription: 'Photo Description', productDescription: [{description: 'product Description', productKeywords: ['keyword', 'keyword'], productUrl: 'https://www.amazon.com/s?k=keywords+keywords'}], tags: ['tag1', 'tag2']} make sure the productUrl uses this format: 'https://www.amazon.com/s?k=keywords+keywords'} with no limitations on keywords. "},
          {role: "user", content: "I would like to create a blog post about Top Interior Design Trends for 2025"}
        ],
        response_format: zodResponseFormat(blogSchema, "Blog"),

    }); 
    const blog = createBlog.choices[0].message.parsed;

    const newBlog = new Blog({
        titleMain: blog.titleMain,
        descriptionSummary: blog.descriptionSummary,
        featuredPhotoDescription: blog.featuredPhotoDescription,
        facebook: blog.facebook,
        instagram: blog.instagram,
        twitter: blog.twitter,
        pinterest: blog.pinterest,
        sections: [...blog.sections],
        tags: blog.tags,
    });

    await newBlog.save();




   
    console.log('✨ Blog Created ✨');

}

// createBlog()