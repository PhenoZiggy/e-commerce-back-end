import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: JSON,
      required: true,
      default: {
        url: 'https://freesvg.org/img/Male-Avatar.png',
        name: 'default_profile_pic.png',
      },
    },
    role: {
      type: [String],
      required: true,
      default: ['user'],
      enum: ['user', 'admin'],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: JSON,
      required: false,
    },
    token: {
      type: JSON,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
