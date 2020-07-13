import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
/*
Recebimento das informações
Tratativa de erros e exceções
Acesso ao repositório


*/

interface IRequest {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}
  // private appointmentsRepository: AppointmentsRepository;

  // constructor(appointmentsRepository: AppointmentsRepository) {
  //   this.appointmentsRepository = appointmentsRepository;
  // }

  // eslint-disable-next-line class-methods-use-this
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
      // return response.status(400).json({message:'This appointment is already booked'})
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
