
// MVC - Padrão Models = tabelas do db/Schema da aplicação;

import {  Schema, model } from 'mongoose';

// tabela/Schema criado;
const UserSchema = new Schema({
    email: String
});

export default model('User', UserSchema);