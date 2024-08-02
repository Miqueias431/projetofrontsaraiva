function login() {
    const us = document.querySelector("#nomeusuario")
    const sh = document.querySelector("#senha")

    // Usamos o comando trim para eliminar os espaços

    if (us.value.trim() == "" || sh.value.trim() == "") {
        return alert("Preencha todos os campos")
    }

    fetch("http://127.0.0.1:9000/api/v1/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nomeusuario: us.value,
            senha: sh.value
        })
    }).then((res) => res.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.error(`Erro ao tentar acessar a api ${error}`))
}

function cadastrarUsuario() {

    const us = document.querySelector("#txtusuario")
    const sh = document.querySelector("#txtsenha")
    const ft = document.querySelector("#txtfotoperfil")

    if (us.value.trim() == "" || sh.value.trim() == "" || ft.value.trim() == "") {
        return alert("Preencha todos os campos")
    }

    fetch("http://127.0.0.1:9000/api/v1/users/cadastrar", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nomeusuario: us.value,
            senha: sh.value,
            foto: ft.value
        })
    }).then((res) => res.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.error(`Erro na api ${error}`))
}

function carregarLivros() {
    const conteudo = document.querySelector(".conteudo")

    fetch("http://127.0.0.1:9001/api/v1/livros/detalhes")
        .then((res) => res.json())
        .then((dados) => {
            dados.payload.map((rs) => {
                let card = `
                    <div class="container card cartao" style="width: 18rem;">
                        <img src=${rs.fotos1} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3>${rs.nometitulo}</h3>
                            <p class="card-text">Autor: ${rs.autor}</p>
                            <p class="card-text livro" >De R$ ${rs.precoatual}</p>
                            <p class="card-text">Por R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                            <a class="btn btn-outline-secondary" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba Mais</a>
                        </div>
                    </div>`

                conteudo.innerHTML += card
            })
        })
        .catch((error) => console.error(`Erro na api ${error}`))

}

function detalhes() {
    let id_url = window.location.search.split('=')

    const conteudo = document.querySelector(".conteudo")



    fetch("http://127.0.0.1:9001/api/v1/livros/detalhes/" + id_url[1])
        .then((res) => res.json())
        .then((dados) => {
            dados.payload.map((rs) => {

                document.querySelector("h2").innerHTML = "Detalhes do livro: " + rs.nometitulo

                let card = `
                <div class="card mb-3 col-md-10">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <div id="carouselExampleIndicators" class="carousel slide carouselDetalhe">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="${rs.fotos1}" class="d-block w-100" alt="Capa do Livro">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${rs.fotos2}" class="d-block w-100" alt="Imagens do livro">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${rs.fotos3}" class="d-block w-100" alt="Imagens do livro">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${rs.fotos4}" class="d-block w-100" alt="Imagens do livro">
                                    </div>
                                </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>  
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${rs.nometitulo}</h3>
                            <h6 class="card-text">Autor: ${rs.autor}</h6>
                            <p class="card-text">${rs.sinopse}</p>
                            <p class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                            <a href=carrinho.html?idlivro=${rs.idtitulo}" class="carrinhobtn"><img src=img/carrinho.png>Adicionar ao carrinho</a>
                        </div>
                    </div>
                </div>`

                conteudo.innerHTML += card
            })
        })
        .catch((error) => console.error(`Erro na api ${error}`))
}

function buscar() {
    const conteudo = document.querySelector(".conteudo")
    // Limpar todo o conteudo
    conteudo.innerHTML = ''
    // Obtendo o texto escrito na caixa de busca
    let palavra = document.querySelector("input").value
    document.querySelector("h2").innerHTML = `Você pesquisou por: ${palavra}`

    fetch("http://127.0.0.1:9001/api/v1/livros/detalhes/titulo/" + palavra)
        .then((res) => res.json())
        .then((dados) => {
            dados.payload.map((rs) => {
                let card = `
                <div class="card mb-3 col-md-8 bordaCard">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${rs.fotos1} class="card-img-top" id="imgPesquisa" alt="...">
                        </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${rs.nometitulo}</h3>
                            <h6 class="card-text">Autor: ${rs.autor}</h6>
                            <p class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                            <a class="btn btn-outline-secondary" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba Mais</a>
                        </div>
                    </div>
                </div>`

                conteudo.innerHTML += card
            })
        })
        .catch((error) => console.error(`Erro na api ${error}`))
}

function carrinho() {
    let id_url = window.location.search.split('=')

    const carrinho = document.querySelector(".carrinho")

    fetch("http://127.0.0.1:9002/api/v1/carrinho/listar/" + id_url[1])
    .then((res) => res.json())
        .then((dados) => {
            dados.payload.map((rs) => {
                let card = `
        <div class="container carrinhot">
            <div class=" card cartaoCa">
                <img src=${rs.fotos1} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5>${rs.nometitulo}</h5>
                    <p class="card-text">Por ${rs.autor}</p>
                    <p>${rs.quantidade}</p>
                    <p class="totallivro">${rs.total}</p>  
                </div>
                
            </div>
            <hr>
        </div>`
                carrinho.innerHTML += card
            })
        })
        .catch((error) => console.error(`Erro na api ${error}`))
}