
// MVC - Contoller - Tratamento da requisições;

// metodos do controler: index,show,update,store,destroy

/*
index: listagem de sessões
store: criar nova sessão
show: listar uma ÚNICA sessão
update: alterar/atualizar alguma sessão
destroy: deletar sessão
*/

// Schema db;
import User from "../models/User";

import * as Yup from 'yup';

// requisição tratada e enviada para a rota/sessions
class SessionController {

  async index(req, res) {
    const { email } = req.body;
    const emails = await User.find({ users: email });
    return res.json(emails);
  }

  async store(req, res) {
    const validation = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if( !(await validation.isValid(req.body)) ) {
      return res.status(400).json({ m: 'Informe um e-mail válido' })
    }

    let user = await User.findOne({ email });

    if (user) {      
      return res.json( `Usuario logado.` );
    } else {
      user = await User.create({ email });
      return res.json({ m: 'Usuario logado com sucesso :) ' });
    }  
  }

  async update(req, res) {
    const { email } = req.body;

    let attEmail = await User.findOne({ email });

    if ( attEmail ) {
      return res.json({ m: "email já cadastrado" });
    } else {
      attEmail = await User.findOneAndUpdate({ email });
      return res.json({ m: "email atualizado com sucesso :)" });
    }
  }

  async destroy(req, res) {
    const { email } = req.body;

    let deleteEmail = await User.findOne({ email });

    if ( !deleteEmail ) {
      return res.json({ m: "email não encontrado" });
    } else {
      deleteEmail = await User.findOneAndDelete({ email });
      return res.json({ m: "email deletado com sucesso :) " });
    }
  }

}

export default new SessionController();
