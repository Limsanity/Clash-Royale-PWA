import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.royaleapi.com/',
  headers: {
    'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMyNiwiaWRlbiI6IjU0MjU5Mjk2MjYxNDM5NDkxMiIsIm1kIjp7fSwidHMiOjE1NDk0MzQ4NTU4MDV9.FfrZIIDpf-meNoA0_LJv-TWsmrZ0UL72WbWVY-WA1lE'
  }
})
