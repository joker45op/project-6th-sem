
let login


async function getLogin() {
  let res = await fetch("http://localhost:3001/getLogin")
  const login = await res.text()
  return login
}

let sub = document.querySelector('#submit')
sub.addEventListener('click', async function () {
  let title = document.querySelector('#titleTxtt')
  let text = document.getElementsByClassName("ck-editor__editable")[0]
  let res = await fetch("http://localhost:3001/blog", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      blog: text.innerHTML.toString()
    })
  })
  res = res.status
  addBlogs()
})

document.getElementsByClassName('ck')[0].style.width = "100%"


async function fetchBlogs() {
  let res = await fetch("http://localhost:3001/blog")
  let blogs = await res.json()
  return blogs
}

async function addBlogs() {
  let blogs = await fetchBlogs()
  let blogParent = document.querySelector('#blogs')

  blogs.map(b => {
    blogParent.innerHTML = blogParent.innerHTML + `
    <div id = "blogInd" key = "${b.id}" >
      <div id="titleTxt">${b.title}</div>
      <div id="blogText">${b.blog}</div>
    </div>
      `
    adminRights(b)
  })
  
}

function adminRights(b) {
  let blogs = document.querySelectorAll('#blogInd')
  if (login === "true") {
    blogs.forEach(blog => {
      blog.innerHTML = blog.innerHTML + `
        <div>
        <input type="button" value="Delete" onclick="deleteBlog(${b.id})" key="${b.id}"/>
        <input type="button" value="Update" onclick="updateBlog(${b.id})"
        
        
        awad/>
        </div>
          `
    })
  }
}

async function logOut() {
  login = await getLogin()
  if (login === "false") {

  }
  if (login === "true") {
    document.querySelector('#log').remove()
    document.querySelector('.nav').innerHTML = document.querySelector('.nav').innerHTML + `<a href="" id="log" onclick="userLogOut()">LogOut</a>`
  }
}

document.body.onload = async function () {
  let form = document.querySelector("#form")
  form.style.display = "none"
  login = await getLogin()
  addBlogs()
  if (login === "false") {
    form.style.display = "none"
  }
  if (login === "true") {
    form.style.display = "flex"
    adminRights()
    logOut()
  }

}