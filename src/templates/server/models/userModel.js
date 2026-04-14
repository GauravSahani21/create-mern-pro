export function getUserModel({ useTypeScript }) {
  const ts = useTypeScript;
  const typeImport = ts ? `import { Document, Model, Schema, model } from 'mongoose';

export interface IUser extends Document {
  // your interface fields
}

` : '';

  return `${typeImport}import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // define schema fields
  },
  {
    timestamps: true,
  }
);

${ts
  ? `const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);`
  : `const User = mongoose.model('User', userSchema);`}

export default User;
`;
}
