
function loadNewImages() {

    return new Promise(function (resolve, reject) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "images.json", true);

        xmlhttp.onload = function () {
            if (xmlhttp.status === 200) {
                var imgJson = JSON.parse(this.responseText);
                imgGenerator(imgJson);
                resolve(xmlhttp.response);
            } else {
                reject(Error('Falha ao carregar a imagem. Código de erro:' + xmlhttp.statusText));
            }
        };
        xmlhttp.onerror = function () {
            reject(Error('Houve um problema de conexão.'));
        };

        xmlhttp.send();
    });
}

function imgGenerator(imgJson) {
    let content = document.getElementById("container");
    for (let i = 0; i <= imgJson.length; i++) {
        let randomIndex = Math.floor(Math.random() * 15);
        let newRandomImg = new Image(640, 480);
        let imgDiv = document.createElement("div");
        newRandomImg.src = imgJson[randomIndex].url;
        imgDiv.appendChild(newRandomImg);
        content.appendChild(imgDiv);
    }
}

function isScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadNewImages().then(res =>{
            console.log(res);
        }).catch(err =>{
            console.error(err);
        });
    }
}


