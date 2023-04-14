import blogModel from "../models/blogModel.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("userId", "-password");
    if (blogs.length === 0) {
      return res.status(200).send("No blogs found");
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel
      .find({ _id: id })
      .populate("userId", "-password");
    blog.views = blog.views + 1;
    await blog.save();

    if (blog.length === 0) {
      return res.status(200).send("No blogs found");
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const featured = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({ featured: true })
      .populate("userId", "-password")
      .limit(3);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const id = req.id;
  try {
    const blog = await blogModel.create({ ...req.body, userId: id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById({ _id: id });
    if (blog.userId !== id) {
      throw new Error("You cant update this blog only owner has the rights!!");
    }

    const updatedBlog = await blogModel
      .findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      )
      .populate("userId", "-password");
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById({ _id: id });
    if(blog.likes.includes(req.user.id)){
      
    }
    // res.status(200).json(blog.likes);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const blogViews = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById({ _id: id });
    res.status(200).json(blog.views);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
