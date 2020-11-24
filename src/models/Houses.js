
import { Schema, model } from "mongoose";

// db Schema;
const HouseSchema = new Schema({
  thumbnail: String,
  description: String,  
  price: Number,
  location: String,
  status: Boolean,
  user: {
    // acessando tabela User
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},

// adicionando formato JSON a virutual Url;
  {
    toJSON: {
      virtuals:true
  }
});

// criando url virtual da imagem para retornar no front;
HouseSchema.virtual('thumbnail_url').get(function(){
  return `http://localhost:3333/files/${this.thumbnail}`;
});

export default model('House', HouseSchema);
