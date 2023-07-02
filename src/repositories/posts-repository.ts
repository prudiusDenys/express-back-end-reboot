import {blogs} from './blogs-repository';
import {v4 as uuid} from 'uuid';

interface PostViewModel {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
}

interface PostInputModel {
  title: string
  shortDescription: string
  content: string
  blogId: string
}

export let posts: PostViewModel[] = []

export const postsRepository = {
  getAllPosts(): PostViewModel[] {
    return posts
  },
  getPost(id: string): PostViewModel | null {
    const post = posts.find(post => post.id === id)

    if (post) return post
    return null
  },
  createPost(postInputModel: PostInputModel): PostViewModel | null {
    const blog = blogs.find(blog => blog.id === postInputModel.blogId)

    if (blog) {
      const newPost = {
        id: uuid(),
        blogName: blog.name,
        ...postInputModel
      }

      posts.push(newPost)
      return newPost
    }
    return null
  },
  editPost(id: string, postInputModel: PostInputModel): true | null {
    const post = posts.find(post => post.id === id)

    if (post) {
      post.title = postInputModel.title
      post.shortDescription = postInputModel.shortDescription
      post.content = postInputModel.content
      post.blogId = postInputModel.blogId
      return true
    } else {
      return null
    }
  },
  removePost(id: string): boolean {
    const post = posts.find(post => post.id === id)

    if (post) {
      posts = posts.filter(post => post.id !== id)
      return true
    }
    return false
  }
}
