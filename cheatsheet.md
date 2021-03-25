
// https://www.w3schools.com/howto/howto_js_sort_list.asp
https://jsbin.com/camalibofi/edit?html,js,output
sort id
```javascript
<ul id="id01">
  <li id="5">Oslo</li>
  <li id="4">Stockholm</li>
  <li id="3">Helsinki</li>
  <li id="2">Berlin</li>
  <li id="1">Rome</li>
  <li id="6">Madrid</li>
</ul>

function sortListDir() {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.getElementById("id01");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
   while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc): */
      if (dir == "asc") {
        console.log(b[i].id);
        if (b[i].id > b[i + 1].id) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically higher than current item,
          mark as a switch and break the loop: */
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  console.log('finish');
}


sortListDir();
```

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