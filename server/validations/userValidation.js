export class UserValidation {
  static async create({ username, password }) {
    if (!username) throw new Error("Missing username");
    if (!password) throw new Error("Missing password");
    return true;
  }
}
