const generator = require('password-generator');
const Queue = require('../services/QueueService');

module.exports = {
  async store(req, res) {

    try {
      const { name, email } = req.body;

      const user = {
        name,
        email,
        password: generator(15, false)
      }

      await Queue.add('RegistrationMail', { user });

      return res.json(user);
    } catch (err) {
      return res.send(400, err);
    }
  }
}