// MVC - Contoller - Tratamento da requisições;

// metodos do controler: index,show,update,store,destroy

/*
index: listagem de sessões
store: criar nova sessão
show: listar uma ÚNICA sessão;
update: alterar/atualizar alguma sessão
destroy: deletar sessão
*/

import Reserva from "../models/Reserva";
import User from "../models/User";
import Houses from "../models/Houses";



class ReservaController {

  async index(req,res) {
   const { user_id } = req.headers;
   const reservas = await Reserva.find( { user: user_id } ).populate('house');

   return res.json(reservas);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { data } = req.body;

    // id da casa existe?
    const house = await Houses.findById(house_id);

    // se id da casa não existir ?
    if (!house) {
      return res.status(400).json({ m: "Casa inexistente." });
    }

    // status false? não criar reserva;
    if (house.status !== true) {
      return res.status(400).json({ m: "Solicitação indisponível." });
    }

    // usuario criou esse anuncio?
    const usuario = await User.findById(user_id);

    // se id = a id do criador do anuncio, não fazer reserva;
    if (String(usuario.id) === String(house.user)) {
      return res.status(401).json({ m: "Reserva indisponível" });
    }

    // caso o usuário não seja o criador do anuncio e a casa existir, então criar reserva;
    const reserve = await Reserva.create({
      user: user_id,
      house: house_id,
      data,
    });

    // retornar dados dos schemas;
    await reserve.populate("user").populate("house").execPopulate();

    return res.json(reserve);
  }

  async destroy(req,res) {
    const { reserva_id } = req.body;

    const deletar = await Reserva.findByIdAndDelete( { _id: reserva_id } );

    return res.json( { m: `Reserva cancelada com sucesso ${deletar}` } );

  }

}

export default new ReservaController();
