window.onload = function () {
    	document.getElementById('input-file')
  		.addEventListener('change', getFile)
    }

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
    //console.log(client, content);
    client.bzz
      .upload(content,
              { contentType: 'text/html' })
       .then(hash => {target.value="Your file is now on swarm at https://swarm-gateways.net/bzz:/"+hash+ '\n'; target.value=target.value+ '\n'+ content;})
  	//target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}
