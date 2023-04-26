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

let sub = document.querySelector('#submit')
sub.addEventListener('click',function(){
  let text = document.getElementsByClassName("ck-editor__editable")[0]
  alert(text.innerHTML.toString())
})

document.getElementsByClassName('ck')[0].style.width = "100%"


async function fetchBlogs(){
  await fetch("http://localhost:300/blog")
}

document.body.onload=function(){
  
}