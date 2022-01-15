const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models = require('./models');
const { json } = require('express/lib/response');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;

let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

let itemcompra = models.ItemCompra;
let compra = models.Compra;
let produto = models.Produto;

// pág inicial
app.get('/', function(req, res){
    res.send('Olá, Mundo')
});
//criar cliente
app.post('/clientes', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message:"Cliente cadastrado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar."
        });
    });
});
//criar pedidos e compras
app.post('/pedidos', async(req, res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message: "Pedido cadastrado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar."
        });
    });
});
app.post('/compras', async(req, res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message: "compra selecionada com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar."
        });
    });
});
//cria serviços e produtos
app.post('/servicos', async(req, res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message:"Serviço selecionado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar."
        });
    });
});
app.post('/produtos', async(req, res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message:"Produto cadastrado com sucesso com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar."
        });
    });
});
//cria itens de pedidos e compras
app.post('/itensPedidos', async(req, res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message: "Item cadastrado com sucesso!"
        });
    }).catch(function(erro){
        //console.log(erro);
        //console.log("teste");

        return res.status(400).json({
            error: erro,
            message:"Foi impossível se conectar."
        });
    });
});
app.post('/itensCompras', async(req, res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message: "Item cadastrado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar."
        });
    });
});
// --> listas
app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    })
});
app.get('/listapedidos', async(req, res)=>{
    await pedido.findAll({
    }).then(function(pedidos){
        res.json({pedidos})
    });
});
app.get('/listacompras', async(req, res)=>{
    await compra.findAll({
    }).then(function(compras){
        res.json({compras})
    });
});
app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});
app.get('/listaprodutos', async(req, res)=>{
    await produto.findAll({
        order: [['nome', 'ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});
app.get('/listaitenspedidos', async(req, res)=>{
    await itempedido.findAll({
    }).then(function(itempedidos){
        res.json({itempedidos})
    });
});
app.get('/listaitenscompras', async(req, res)=>{
    await itemcompra.findAll({
    }).then(function(itemcompras){
        res.json({itemcompras})
    });
});

//CONSULTA

//consulta o pedido
app.get('/clientes/:id', async(req, res)=>{
    await cliente.findByPk(req.params.id, {include:[{all: true}]})
    .then(clin=>{
        return res.json({clin});
    });
});

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id, {include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

app.get('/compras/:id', async(req, res)=>{
    await compra.findByPk(req.params.id, {include:[{all: true}]})
    .then(comp=>{
        return res.json({comp});
    })
})

app.get('/servicos/:id', async(req, res)=>{
    await servico.findByPk(req.params.id, {include:[{all: true}]})
    .then(ser=>{
        return res.json({ser});
    })
})

app.get('/produtos/:id', async(req, res)=>{
    await produto.findByPk(req.params.id, {include:[{all: true}]})
    .then(pro=>{
        return res.json({pro});
    })
})

// --> alterações

app.put('/clientes/:id/editarcliente', async(req, res)=>{
    const clien={
        nome: req.body.nome,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento
    };
    await cliente.update(clien, {
        where: Sequelize.and({id: req.body.id})
    }).then(function(cl){
        return res.json({
            error:false,
            message: "Cliente foi alterado com sucesso!",
            cl
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/pedidos/:id/editarpedido', async(req, res)=>{
    const pepe={
        data: req.body.data
    };
    await pedido.update(pepe, {
        where: Sequelize.and({id: req.body.id})
    }).then(function(pe){
        return res.json({
            error:false,
            message: "Pedido foi alterado com sucesso!",
            pe
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/compras/:id/editarcompra', async(req, res)=>{
    const comcom={
        data: req.body.data
    };
    await compra.update(comcom, {
        where: Sequelize.and({id: req.body.id})
    }).then(function(co){
        return res.json({
            error:false,
            message: "Compra foi alterada com sucesso!",
            co
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/servicos/:id/editarservico', async(req, res)=>{
    const serser={
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    await servico.update(serser, {
        where: Sequelize.and({id: req.body.id})
    }).then(function(se){
        return res.json({
            error:false,
            message: "Servico foi alterado com sucesso!",
            se
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/produtos/:id/editarproduto', async(req, res)=>{
    const propro={
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    await produto.update(propro, {
        where: Sequelize.and({id: req.body.id})
    }).then(function(pr){
        return res.json({
            error:false,
            message: "Produto foi alterado com sucesso!",
            pr
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/pedidos/:id/editaritempedido', async(req, res)=>{
    const item={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message: 'Pedido não foi encontrado.'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error:false,
            message: "Pedido foi alterado com sucesso!",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/compras/:id/editaritemcompra', async(req, res)=>{
    const itemcom={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message: 'Compra não foi encontrada.'
        });
    };
    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };

    await itemcompra.update(itemcom, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then(function(itensco){
        return res.json({
            error:false,
            message: "Compra foi alterado com sucesso!",
            itensco
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});




// Excluir
app.delete('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});
app.delete('/excluirpedido/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o pedido."
        });
    });
});
app.delete('/excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra foi excluida com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir compra."
        });
    });
});
app.delete('/excluirservico/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Servico foi excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o servico."
        });
    });
});
app.delete('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        });
    });
});

let port = process.env.PORT  || 3001;

app.listen(port, (req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})














//comentado pois NÃO SERA USADO! (opcional)
//Contagem de serviços

// app.get('/ofertaservicos', async(req, res)=>{
//     await servico.count('id').then(function(servicos){
//         res.json({servicos});
//     });
// });



