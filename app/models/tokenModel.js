const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Token expira en 1 hora
  }
});

module.exports = mongoose.model('Token', TokenSchema);

// controllers/token_utils.js
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

class TokenManager {
  // Generar nuevo token
  static async generateToken(user) {
    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username 
      }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Guardar token en base de datos
    await Token.create({
      userId: user._id,
      token: token
    });

    return token;
  }

  // Verificar token
  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Verificar si el token existe en base de datos
      const tokenDoc = await Token.findOne({ token });
      
      if (!tokenDoc) {
        throw new Error('Token inválido');
      }

      return decoded;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  // Invalidar token
  static async invalidateToken(token) {
    await Token.findOneAndDelete({ token });
  }
}

module.exports = TokenManager;