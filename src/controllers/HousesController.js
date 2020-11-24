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
import House from "../models/Houses";
import User from "../models/User";

// validação de inputs;
import * as Yup from 'yup';

// requisição tratada e enviada para a rota/Houses;

class HousesController {

  // async show(req,res) {
  //   const { user_id } = req.headers;

  //   const houses = await House.find({ user: user_id });

  //   return res.json(houses);
  // }

  async index(req, res) {
    // filter by query params;
    const { status } = req.query;
    const houses = await House.find({ status });

    return res.json(houses);
  }

  async store(req, res) {
    console.log(req.body);
    console.log(req.file);

    const validation = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    // acessando imagens para enviar ao db;
    const { filename } = req.file;
    // acessando body da requisição;
    const { description, price, location, status } = req.body;
    // acessando header da requisição e pegando id do usuário logado;
    const { user_id } = req.headers;

    // validação de input;
    if(! ( await validation.isValid(req.body) ) ) {
        return res.status(400).json({ m: 'Campos inválidos.' });
    }

    const houses = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(houses);
  }

  async update(req, res) {

    const validation = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { user_id } = req.headers; // id do usuário logado;
    const { house_id } = req.params; //id da casa;
    const { filename } = req.file; // foto;
    const { description, price, location, status } = req.body; // dados a serem atualizados;

     // validação de input;
     if(! ( await validation.isValid(req.body) ) ) {
      return res.status(400).json({ m: 'Campos inválidos!' });
    }

    const user = await User.findById(user_id); // achar usuário pelo id
    const houses = await House.findById(house_id); // achar id da casa cadastrada pelo usuário

    // se usuario não criou o anuncio da casa ? então não poderá atualizar os dados.
    if( String(user._id) !== String(houses.user) ) {
      return res.status(401).json({m: 'usuário não autorizado' });
    }
   
    // se o usuario que esta atualizando for o criador do anuncio ? então atualizar.
    await House.updateOne( { _id: house_id }, {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    return res.send({ m: 'Atualização efetuada com sucesso.' });
  }

  async destroy(req,res) {
    const { house_id } = req.body;
    const  { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

     // se usuario não criou o anuncio da casa ? então não poderá deletar os dados.
    if( String(user._id) !== String(houses.user) ) {
      return res.status(401).json({m: 'usuário não autorizado' });
    }

    // se o usuario que esta atualizando for o criador do anuncio ? então poderá deletar.
    await House.findByIdAndDelete({ _id: house_id });

    return res.json({ m: 'Casa deletada com sucesso.' });
  }  

}

export default new HousesController();
