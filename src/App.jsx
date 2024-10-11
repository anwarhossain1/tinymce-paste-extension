
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import './App.css';
function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY

  const detectSource = (html) => {
    if (html.includes("<!--StartFragment-->") || html.includes("mso-")) {
      return "MSOffice";
    }
    if (html.includes("docs-internal-guid") || html.includes('class="Google"')) {
      return "GoogleDocs";
    }
    if (html.includes("<table") && html.includes("<tr")) {
      return "Excel";
    }
    return "Unknown";
  };

  const cleanHTML = (html, source) => {
    if (source === "MSOffice") {
      return html.replace(/<!--.*?-->/g, "").replace(/style=".*?"/g, "");
    }
    if (source === "GoogleDocs") {
      return html.replace(/<style.*?<\/style>/g, "").replace(/class=".*?"/g, "");
    }
    if (source === "Excel") {
      return html.replace(/<o:p>/g, "").replace(/<\/o:p>/g, "");
    }
    return html;
  };

  const stripFormatting = (html) => {
    return html.replace(/style=".*?"/g, "").replace(/<span.*?>/g, "").replace(/<\/span>/g, "");
  };

  return (
    <>
    <Editor
      apiKey={tinymceApiKey}
      onInit={(_evt, editor) => editorRef.current = editor}
      initialValue="<p>This is the initial content of the editor.</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
         'paste'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        setup : (editor)=>{
          editor.on("pastepreprocess", (e) => {
            const clipboardData = e.content;
            const source = detectSource(clipboardData);
            if (source === "MSOffice" || source === "GoogleDocs" || source === "Excel") {
              e.content = cleanHTML(clipboardData, source);
              const keepFormatting = window.confirm("Do you want to keep the formatting?");
              if (!keepFormatting) {
                e.content = stripFormatting(e.content);
              }
            }
          
          })

        }
      }}
    />
    <button onClick={log}>Log editor content</button>
  </>
  )
}

export default App
