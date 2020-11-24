
// MVC - Padrão Models = tabelas do db/Schema da aplicação;

import { Schema, model } from 'mongoose';

// tabela/Schema criado;
const ReservaSchema = new Schema({
    data: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }

});

export default model('Reserva', ReservaSchema);