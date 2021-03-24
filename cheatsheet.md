



```javascript
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
// https://catalin.red/copy-clipboard-js/
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API up to date
// https://web.dev/async-clipboard/
// https://catalin.red/copy-clipboard-js/
//copy 
async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(location.href);
    console.log('Page URL copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

//paste required permission from user
async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
```