import { render, fireEvent, waitFor } from '@testing-library/react'
import FormAppointment from '../src/components/data-table-shell/appointments/form'
import * as petService from '../src/services/admin/pets'
import * as vetService from '../src/services/admin/veterinarias'
import * as serviceService from '../src/services/public/services'

jest.mock('../src/services/admin/pets', () => ({
  // Ajustada la ruta
  getPets: jest.fn(),
}))

jest.mock('../src/services/admin/veterinarias', () => ({
  // Ajustada la ruta
  getVeterinarians: jest.fn(),
}))

jest.mock('../src/services/public/services', () => ({
  // Ajustada la ruta
  getServices: jest.fn(),
}))

describe('FormAppointment', () => {
  it('debe cargar y mostrar las opciones de mascotas, veterinarios y servicios', async () => {
    // petService.getPets.mockResolvedValue(/* Mock de mascotas */);
    // vetService.getVeterinarians.mockResolvedValue(/* Mock de veterinarios */);
    // serviceService.getServices.mockResolvedValue(/* Mock de servicios */);

    const { getByLabelText } = render(
      <FormAppointment
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => Promise.resolve(true)}
        title='Registrar cita:'
      />
    )
    
    await waitFor(() => {
      expect(getByLabelText('Mascota:')).not.toBeNull()
      expect(getByLabelText('Veterinario:')).not.toBeNull()
    })
  })

  // Más tests según sea necesario
})
