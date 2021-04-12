const Mail = require('../services/MailService');

module.exports = {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
    priority: 3,
  },
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Redis <teste@redis.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadatro de usuário',
      html: `Ola ${user.name}, bem vindo`
    })
  }
}

