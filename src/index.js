async function test(){
    const get = await axios('https://www.githubstatus.com/');
    const text = await texto(get); 
    const cut = await getHTMLBody(text);
    const log = await console.log(cut);
}
function texto(data){ return document.body.innerText = data.data};
function getHTMLBody(file){
    let newFile = file.split('<div class="components-section font-regular">');
    let finalFile = newFile[1].split('<div class="scheduled-maintenances-container">');
    return document.body.innerHTML = finalFile[0];
}
test();





