import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// Post http://localhost:3333/appointments

// DTO = Data transfer object
// SOC Sepparation of Concerns. Separação de preocupações
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.send({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
