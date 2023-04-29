// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import ImageTool from '@editorjs/image';
// import AttachesTool from '@editorjs/attaches';
// import Underline from '@editorjs/underline';
// import Quote from "@editorjs/quote"
// import LinkTool from '@editorjs/link'
// import Paragraph from '@editorjs/paragraph'
// import InlineCode from '@editorjs/inline-code'

// const editor = new EditorJS({
//     holder: 'editor',

//     tools: {
//         header: Header,
//         list: List,
//         image: {
//             class: ImageTool,
//             config: {
//               endpoints: {
//                 byFile: 'http://localhost:3001/uploadFile', // Your backend file uploader endpoint
//                 byUrl: 'http://localhost:3008/fetchUrl', // Your endpoint that provides uploading by Url
//               }
//             }
//           },
//         attaches: AttachesTool,
//         underline: Underline,
//         quote: Quote,
//         linkTool: LinkTool,
//         paragraph:Paragraph,
//         inlineCode: {
//             class: InlineCode,
//             shortcut: 'CMD+M',
//           },
//     },
// })

import axios from 'axios'

let sub = document.querySelector('#submit')
sub.addEventListener('click', async function () {
  let headTxt = document.querySelector("#headtxt").value
  let blogTxt = document.getElementsByClassName("ck-editor__editable")[0].innerHTML.toString()

  async function d() {
    console.log([headTxt, blogTxt]);
    let da = await JSON.stringify({
      heading: headTxt,
      blog: blogTxt
    })
    return da
  }

  let data = d()
  axios.post('http://localhost:3001/blog', {
    heading: headTxt,
    blog: blogTxt
  })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
})

document.getElementsByClassName('ck')[0].style.width = "100%"
document.body.onload = function () {
  axios.get('http://localhost:3001/blog')
    .then((response) => {
      response.data.forEach(ele => {
        console.log(ele);
      });
    }, (error) => {
      console.log(error);
    });
}