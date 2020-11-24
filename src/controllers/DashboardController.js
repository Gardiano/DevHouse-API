// MVC - Contoller - Tratamento da requisições;

// metodos do controler: index,show,update,store,destroy

/*
index: listagem de sessões
store: criar nova sessão
show: listar uma ÚNICA sessão;
update: alterar/atualizar alguma sessão
destroy: deletar sessão
*/

// DashBoard para buscar todas as casas cadastradas.

// Schema db;
import House from "../models/Houses";


// requisição tratada e enviada para a rota/Houses;

class DashboardController {

    // buscando todas as casas cadastradas;
async show(req,res) { 
    const { user_id } = req.headers;

    const houses = await House.find({ user: user_id })

    return res.json(houses);
}

}

export default new DashboardController();
