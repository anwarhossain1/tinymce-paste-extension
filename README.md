# TinyMCE Custom Paste Extension in React

This is a custom React project that integrates the TinyMCE editor and enhances the paste functionality to handle content pasted from sources like Microsoft Office, Google Docs, and Excel. It detects the source of the pasted content and provides the user with an option to either keep the original formatting or strip the formatting before inserting it into the editor.

## Features

- **Content Source Detection**: Detects whether the pasted content is from Microsoft Office, Google Docs, or Excel.
- **Paste Dialog**: Displays a custom dialog when content is pasted, allowing the user to choose whether to keep the formatting or remove it.
- **Formatting Cleanup**: Cleans up unnecessary HTML code from the pasted content depending on the source.
  - Removes unwanted `style` tags, `class` attributes, and comments from Microsoft Office content.
  - Removes unnecessary styles and classes from Google Docs content.
  - Cleans rogue `o:p` tags from Excel content.
- **Customizable Logic**: Easily extendable to handle other sources or further modify the cleaning logic.

## Project Setup

### Prerequisites

- Node.js (v12 or later)
- React (v16.8 or later)
- Vite (as the build tool)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anwarhossain1/tinymce-paste-extension.git
   cd tinymce-paste-extension
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file at the root of the project and adding your TinyMCE API key:

   ```
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Usage

The TinyMCE editor will allow you to paste content from MS Office, Google Docs, and Excel. Once content is pasted, a dialog box will appear asking whether you'd like to keep the original formatting or paste without formatting.

- **Keep Formatting**: Preserves the formatting but cleans up unnecessary HTML tags like comments and inline styles.
- **Paste Without Formatting**: Strips all formatting, ensuring a clean and simple insertion of content.

### Customization

- **Detecting Other Sources**: You can extend the `detectSource` function to detect other content sources by checking the specific HTML signatures of the pasted content.
- **Modifying the Cleaning Logic**: The `cleanHTML` and `stripFormatting` functions are modular and can be modified to perform more specific cleaning operations depending on your needs.

### Code Overview

- **\`detectSource(html)\`**: Detects whether the pasted content comes from MS Office, Google Docs, or Excel based on specific HTML markers.
- **\`cleanHTML(html, source)\`**: Cleans the pasted content by removing unnecessary tags and inline styles, depending on the content source.
- **\`stripFormatting(html)\`**: Strips all styles and extra elements to produce a clean, plain-text-like HTML insertion.
- **\`openKeepFormattingDialog(editor, content, callback)\`**: Opens a custom dialog in TinyMCE allowing the user to choose whether to keep formatting or not.

## Future Improvements

- Add support for detecting other document sources like PDFs or other online document editors.
- Implement a more advanced cleaning mechanism for complex tables or embedded media.

## Contributing

Feel free to submit pull requests or open issues to enhance the project.

## Acknowledgments

- [TinyMCE](https://www.tiny.cloud/) for the excellent WYSIWYG editor.
- [Vite](https://vitejs.dev/) for a fast build tool for modern web applications.
