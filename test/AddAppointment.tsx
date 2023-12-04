import { render, fireEvent, waitFor } from '@testing-library/react'
import { AddAppointment } from '../src/components/data-table-shell/appointments/add'
import * as nextRouter from 'next/router'
import * as appointmentService from '../src/services/admin/appointments'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/services/admin/appointments', () => ({ // Ajustada la ruta
  createAppointment: jest.fn(),
}));

describe('AddAppointment', () => {
  it('debe manejar el envío del formulario correctamente', async () => {
    const mockRouter = {
      refresh: jest.fn(),
    };
    (nextRouter.useRouter as jest.Mock).mockReturnValue(mockRouter);

    (appointmentService.createAppointment as jest.Mock).mockResolvedValue(true);

    const { getByText, getByLabelText } = render(<AddAppointment isOpen={true} onClose={() => {}} />);

    fireEvent.change(getByLabelText('Mascota:'), { target: { value: '1' } });
    fireEvent.click(getByText('Confirmar'));

    await waitFor(() => {
      expect(appointmentService.createAppointment).toHaveBeenCalled();
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });
});
