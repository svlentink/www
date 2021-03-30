
function saveToFile(inp, filename) { //https://stackoverflow.com/questions/21479107/saving-html5-textarea-contents-to-file
    var textFileAsBlob = new window.Blob([ inp ], { type: 'text/plain' })
    
    var downloadLink = document.createElement("a")
    downloadLink.download = filename
    downloadLink.innerHTML = "Download File"
    if (window.webkitURL != null) {
      // Chrome allows the link to be clicked without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob)
    } else {
      // Firefox requires the link to be added to the DOM before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
      downloadLink.onclick = (e) => {document.body.removeChild(e.target)}
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink)
    }
    downloadLink.click()
}

export { saveToFile }
