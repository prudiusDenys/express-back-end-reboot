import {v4 as uuid} from 'uuid';

interface BlogViewModel {
  id: string
  name: string
  description: string
  websiteUrl: string
}

interface BlogInputModel {
  name: string
  description: string
  websiteUrl: string
}

export let blogs: BlogViewModel[] = []

export const blogsRepository = {
  getAllBlogs(): BlogViewModel[] {
    return blogs
  },
  getBlog(id: string): BlogViewModel | null {
    const blog = blogs.find(blog => blog.id === id)

    if (blog) return blog
    return null
  },
  createBlog(blogInputModel: BlogInputModel): BlogViewModel {
    const newBlog = {
      id: uuid(),
      ...blogInputModel
    }

    blogs.push(newBlog)
    return newBlog
  },
  editBlog(id: string, blogInputModel: BlogInputModel): true | null {
    const blog = blogs.find(blog => blog.id === id)

    if (blog) {
      blog.name = blogInputModel.name
      blog.description = blogInputModel.description
      blog.websiteUrl = blogInputModel.websiteUrl
      return true
    } else {
      return null
    }
  },
  removeBlog(id: string): boolean {
    const blog = blogs.find(blog => blog.id === id)

    if (blog) {
      blogs = blogs.filter(blog => blog.id !== id)
      return true
    }
    return false
  }
}
