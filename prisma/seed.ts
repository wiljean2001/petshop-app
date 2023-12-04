const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const clinics = [
  {
    name: 'Clínica Veterinaria PetShop',
    location: 'Calle Piura 608, La Unión, Piura',
    phone: '9534333761',
    image: 'https://ejemplo.com/clinica1.jpg',
  },
]

const schedules = [
  {
    dayWeek: 'Lunes a Sábado',
    openingHour: '08:00',
    closingHour: '18:00',
  },
  {
    dayWeek: 'Lunes a Viernes',
    openingHour: '08:00',
    closingHour: '18:00',
  },
  {
    dayWeek: 'Sábado',
    openingHour: '09:00',
    closingHour: '17:00',
  },
]

const veterinarians = [
  {
    name: 'Ana',
    surname: 'Gómez',
    phone: '123456789',
    specialty: 'Cardiología Veterinaria',
    email: 'ana.gomez@ejemplo.com',
  },
  {
    name: 'Carlos',
    surname: 'Martínez',
    phone: '987654321',
    specialty: 'Dermatología Veterinaria',
    email: 'carlos.martinez@ejemplo.com',
  },
]
const owners = [
  {
    name: 'Laura',
    surname: 'Pérez',
    city: 'Madrid',
    address: 'Calle de la Paz 11',
    phone: '1122334455',
    email: 'laura.perez@ejemplo.com',
  },
  {
    name: 'David',
    surname: 'García',
    city: 'Barcelona',
    address: 'Gran Via 22',
    phone: '5544332211',
    email: 'david.garcia@ejemplo.com',
  },
  {
    name: 'María',
    surname: 'López',
    city: 'Sevilla',
    address: 'Avenida de la Constitución 33',
    phone: '6677889900',
    email: 'maria.lopez@ejemplo.com',
  },
  {
    name: 'José',
    surname: 'Martínez',
    city: 'Valencia',
    address: 'Calle Colón 44',
    phone: '9988776655',
    email: 'jose.martinez@ejemplo.com',
  },
]

//   Species
const species = [
  { name: 'Perro' },
  { name: 'Gato' },
  { name: 'Conejo' },
  { name: 'Ave' },
  { name: 'Reptil' },
  { name: 'Pez' },
  { name: 'Caballo' },
  { name: 'Hámster' },
  { name: 'Tortuga' },
  { name: 'Cobaya' },
]

// Breeds
const dogBreeds = [
  { name: 'Labrador' },
  { name: 'Golden Retriever' },
  { name: 'Beagle' },
  { name: 'Bulldog' },
  { name: 'Poodle' },
]
const catBreeds = [
  { name: 'Siamés' },
  { name: 'Persa' },
  { name: 'Maine Coon' },
  { name: 'Ragdoll' },
  { name: 'Bengalí' },
]
const rabbitBreeds = [
  { name: 'Holland Lop' },
  { name: 'Netherland Dwarf' },
  { name: 'Rex' },
  { name: 'Mini Lop' },
  { name: 'Angora' },
]
const birdBreeds = [
  { name: 'Periquito' },
  { name: 'Canario' },
  { name: 'Loro' },
  { name: 'Cacatúa' },
  { name: 'Agapornis' },
]
const fishBreeds = [
  { name: 'Guppy' },
  { name: 'Betta' },
  { name: 'Goldfish' },
  { name: 'Neón' },
  { name: 'Ángel' },
]

const pets = [
  {
    name: 'Max',
    gender: 'Macho',
    color: 'Negro',
  },
  {
    name: 'Luna',
    gender: 'Hembra',
    color: 'Blanco',
  },
  {
    name: 'Rocky',
    gender: 'Macho',
    color: 'Marrón',
  },
  {
    name: 'Bella',
    gender: 'Hembra',
    color: 'Gris',
  },
  {
    name: 'Coco',
    gender: 'Macho',
    color: 'Verde',
  },
]

const services = [
  {
    name: 'Consulta General',
    image: 'https://ejemplo.com/servicio1.jpg',
    description: 'Consulta veterinaria general',
    cost: 30.0,
    duration: 30,
    state: 'ACTIVE',
    requiresClinicalData: true,
  },
  {
    name: 'Vacunación',
    image: 'https://ejemplo.com/servicio2.jpg',
    description: 'Servicio de vacunación para mascotas',
    cost: 20.0,
    duration: 15,
    state: 'ACTIVE',
  },
]

const serviceDetails = [
  {
    detailType: 'Tipo 1',
    value: 'Detalle 1',
  },
  {
    detailType: 'Tipo 2',
    value: 'Detalle 2',
  },
]

const appointments = [
  {
    scheduledDateTime: new Date(),
    status: 'PENDING',
  },
  {
    scheduledDateTime: new Date(),
    status: 'CONFIRMED',
  },
]

const serviceAppointments = [
  {
    date: new Date(),
    details: 'Detalle de la cita',
    requiresClinicalData: true,
    cost: 50.0,
  },
  {
    date: new Date(),
    details: 'Detalle de la cita',
    cost: 40.0,
    requiresClinicalData: false,
  },
]

async function seedClinics() {
  for (const clinic of clinics) {
    await prisma.clinic.create({ data: clinic })
  }
}

// Y así sucesivamente para otras entidades no dependientes.

async function seedVeterinarians() {
  const clinics = await prisma.clinic.findMany()
  for (const veterinarian of veterinarians) {
    await prisma.veterinarian.create({
      data: {
        ...veterinarian,
        clinicId: clinics[Math.floor(Math.random() * clinics.length)].id,
      },
    })
  }
}

// Similar para Owners y ServiceDetails.

async function seedBreeds() {
  const species = await prisma.specie.findMany()
  for (const breed of [
    ...dogBreeds,
    ...catBreeds,
    ...rabbitBreeds,
    ...birdBreeds,
    ...fishBreeds,
  ]) {
    await prisma.breed.create({
      data: {
        ...breed,
        specieId: species[Math.floor(Math.random() * species.length)].id,
      },
    })
  }
}

async function seedPets() {
  const owners = await prisma.owner.findMany()
  const breeds = await prisma.breed.findMany()
  for (const pet of pets) {
    await prisma.pet.create({
      data: {
        ...pet,
        ownerId: owners[Math.floor(Math.random() * owners.length)].id,
        breedId: breeds[Math.floor(Math.random() * breeds.length)].id,
      },
    })
  }
}

async function seedAppointments() {
  const pets = await prisma.pet.findMany()
  const veterinarians = await prisma.veterinarian.findMany()

  for (const appointment of appointments) {
    await prisma.appointments.create({
      data: {
        ...appointment,
        petId: pets[Math.floor(Math.random() * pets.length)].id,
        vetId:
          veterinarians[Math.floor(Math.random() * veterinarians.length)].id,
      },
    })
  }
}

async function seedServiceAppointments() {
  const appointments = await prisma.appointments.findMany()
  const services = await prisma.service.findMany()

  for (const serviceAppointment of serviceAppointments) {
    await prisma.serviceAppointments.create({
      data: {
        ...serviceAppointment,
        appointmentId:
          appointments[Math.floor(Math.random() * appointments.length)].id,
        serviceId: services[Math.floor(Math.random() * services.length)].id,
      },
    })
  }
}

async function seedServiceDetails() {
  const services = await prisma.service.findMany()

  for (const detail of serviceDetails) {
    await prisma.serviceDetails.create({
      data: {
        ...detail,
        serviceId: services[Math.floor(Math.random() * services.length)].id,
      },
    })
  }
}

async function seedSchedules() {
  for (const schedule of schedules) {
    await prisma.schedule.create({ data: schedule })
  }
}

async function seedOwners() {
  for (const owner of owners) {
    await prisma.owner.create({ data: owner })
  }
}

async function seedServices() {
  for (const service of services) {
    await prisma.service.create({ data: service })
  }
}

async function seedSpecies() {
  for (const specie of species) {
    await prisma.specie.create({ data: specie })
  }
}

async function main() {
  // await seedClinics()
  // await seedSchedules()

  // await seedVeterinarians()
  // await seedOwners()

  // await seedSpecies()
  // await seedBreeds()

  // await seedPets()
  // await seedServices()

  await seedServiceDetails()
  
  // await seedAppointments()
  // await seedServiceAppointments()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
