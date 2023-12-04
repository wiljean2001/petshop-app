import type { MainNavItem, SidebarNavItem } from '@/models/nav'

let langAndRoleString: string = ''

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const enum ERoutingPath {
  HOME = '/',
  SERVICES = '/#services',
  CONTACT = '/#contact',

  LOGIN = '/login',
  REGISTER = '/register',
  USER = '/user',
  ADMIN = '/admin',
}
/**
 * Enumeración de rutas de usuario.
 */
export const enum EUserRoutingPath {
  USER_PETS = '/user/pets',
  USER_OWNERS = '/user/owners',
  // USER_ATTENTIONS = '/user/attentions',
  USER_APPOINTMENTS = '/user/appointments', // appointments - citas
  // USER_INVOICES = '/user/invoices',
  // USER_PAYMENTS = '/user/payments',
  // USER_NOTES = '/user/notes',
}

export const enum EAdminRoutingPath {
  ADMIN_ATTENTIONS = '/admin/attentions',
  ADMIN_APPOINTMENTS = '/admin/appointments',
  ADMIN_MEDICAL_RECORDS = '/admin/medical-records',
  ADMIN_SERVICES = '/admin/services',
  ADMIN_OWNERS = '/admin/owners',
  ADMIN_PETS = '/admin/pets',
  ADMIN_BREEDS = '/admin/breeds',
  ADMIN_SPECIES = '/admin/species',
  ADMIN_PRESCRIPTIONS = '/admin/prescriptions',
  ADMIN_USERS = '/admin/users',
  ADMIN_VETERINARIANS = '/admin/veterinarians',
  ADMIN_NOTES = '/admin/notes',
  ADMIN_REMINDERS = '/admin/reminders',
  ADMIN_CLINICS = '/admin/clinics',
  ADMIN_SCHEDULES = '/admin/schedules',
  ADMIN_DASHBOARD = '/admin/',
  // ADMIN_ROLES = '/admin/roles',
  // ADMIN_PERMISSIONS = '/admin/permissions',
  ADMIN_PROFILE = '/admin/profile',
}

/**
 * Configuración de documentación basada en el rol.
 * @param {string} role - El rol del usuario (opcional).
 * @returns {DocsConfig} - La configuración de la documentación.
 */
export const docsConfig = (role?: string): DocsConfig => {
  let options: SidebarNavItem[] = []
  if (role) {
    options = role === 'user' ? userOptions : adminOptions
  }

  return {
    mainNav: [
      {
        title: 'Inicio',
        href: ERoutingPath.HOME,
        iconClass: '',
      },
      {
        title: 'Servicios',
        href: ERoutingPath.SERVICES,
        iconClass: '',
      },
      {
        title: 'Contactar',
        href: ERoutingPath.CONTACT,
        iconClass: '',
      },
    ],
    sidebarNav: options,
  }
}

const userOptions: SidebarNavItem[] = [
  {
    title: 'Mis Mascotas',
    items: [
      {
        title: 'Lista de mascotas',
        href: EUserRoutingPath.USER_PETS,
        iconClass: 'bx bxs-cat',
        items: [],
      },
    ],
  },
  // {
  //   title: 'Mis atenciones',
  //   items: [
  //     {
  //       title: 'Atenciones',
  //       href: EUserRoutingPath.USER_ATTENTIONS,
  //       iconClass: 'bx bxs-capsule',
  //       items: [],
  //     },
  //   ],
  // },
  {
    title: 'Propietarios',
    items: [
      {
        title: 'Propietarios',
        href: EUserRoutingPath.USER_OWNERS,
        iconClass: 'bx bxs-injection',
        items: [],
      },
    ],
  },
  {
    title: 'Citas',
    items: [
      {
        title: 'Citas programadas',
        href: EUserRoutingPath.USER_APPOINTMENTS,
        iconClass: 'bx bx-calendar',
        items: [],
      },
    ],
  },
]

// {
//   title: 'Locales',
//   items: [
//     {
//       title: 'Datos de contacto',
//       href: `/${prefix.user}/contact`,
//       iconClass: 'bx bxs-contact',
//       items: [],
//     },
//   ],
// },
// {
//   title: 'Propietarios',
//   items: [
//     {
//       title: 'Datos de contacto',
//       href: `/${prefix.user}/contact`,
//       iconClass: 'bx bxs-contact',
//       items: [],
//     },
//   ],
// },
const adminOptions: SidebarNavItem[] = [
  {
    title: 'Salud',
    items: [
      {
        title: 'Citas',
        href: EAdminRoutingPath.ADMIN_APPOINTMENTS,
        icon: 'timerIcon',
        items: [],
      },
      {
        title: 'Atenciones',
        href: EAdminRoutingPath.ADMIN_ATTENTIONS,
        icon: 'activity',
        items: [],
      },
      {
        title: 'Historial Médico',
        href: EAdminRoutingPath.ADMIN_MEDICAL_RECORDS,
        iconClass: 'bx bx-clipboard',
        items: [],
      },
      {
        title: 'Servicios',
        href: EAdminRoutingPath.ADMIN_SERVICES,
        iconClass: 'bx bx-clipboard',
        items: [],
      },
    ],
  },
  {
    title: 'Propietarios',
    items: [
      {
        title: 'Propietarios',
        href: EAdminRoutingPath.ADMIN_OWNERS,
        iconClass: 'bx bx-user',
        items: [],
      },
    ],
  },
  {
    title: 'Mascotas',
    items: [
      {
        title: 'Mascotas',
        href: EAdminRoutingPath.ADMIN_PETS,
        icon: 'pawPrintIcon',
        items: [],
      },
      {
        title: 'Razas',
        href: EAdminRoutingPath.ADMIN_BREEDS,
        icon: 'outdent',
        // iconClass: 'bx bx-vial',
        items: [],
      },
      {
        title: 'Especies',
        href: EAdminRoutingPath.ADMIN_SPECIES,
        icon: 'outdent',
        items: [],
      },
    ],
  },
  {
    title: 'Mis locales',
    items: [
      {
        title: 'Clinicas',
        href: EAdminRoutingPath.ADMIN_CLINICS,
        icon: 'building2',
        items: [],
      },
      {
        title: 'Horarios',
        href: EAdminRoutingPath.ADMIN_SCHEDULES,
        icon: 'calendarCheck',
        items: [],
      },
    ],
  },
  {
    title: 'Gestionar usuarios',
    items: [
      {
        title: 'Usuarios',
        href: EAdminRoutingPath.ADMIN_USERS,
        icon: 'users',
        items: [],
      },
      {
        title: 'Veterinarios',
        href: EAdminRoutingPath.ADMIN_VETERINARIANS,
        icon: 'stethoscope',
        items: [],
      },
    ],
  },
  {
    title: 'Diseño de Administrador',
    items: [
      {
        title: 'Panel de Control',
        href: EAdminRoutingPath.ADMIN_DASHBOARD,
        iconClass: 'bx bx-line-chart',
        items: [],
      },
      // {
      //   title: 'Roles',
      //   href: EAdminRoutingPath.ADMIN_ROLES,
      //   iconClass: 'bx bx-error',
      //   items: [],
      // },
      // {
      //   title: 'Permisos',
      //   href: EAdminRoutingPath.ADMIN_PERMISSIONS,
      //   iconClass: 'bx bxs-hand',
      //   items: [],
      // },
      {
        title: 'Perfil',
        href: EAdminRoutingPath.ADMIN_PROFILE,
        iconClass: 'bx bx-user-circle',
        items: [],
      },
    ],
  },
]
