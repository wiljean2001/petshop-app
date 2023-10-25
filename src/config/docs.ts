import type { MainNavItem, SidebarNavItem } from '@/models/nav'

let langAndRoleString: string = ''

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const enum ERoutingPath {
  HOME = '',
  SERVICES = '#services',
  CONTACT = '#contact',

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
  USER_ATTENTIONS = '/user/attentions',
  USER_OWNERS = '/user/owners',
  USER_APPOINTMENTS = '/user/appointments',
  USER_INVOICES = '/user/invoices',
  USER_PAYMENTS = '/user/payments',
  USER_NOTES = '/user/notes',
}

export const enum EAdminRoutingPath {
  ADMIN_APPOINTMENTS = '/appointments',
  ADMIN_MEDICAL_RECORDS = '/medical-records',
  ADMIN_OWNERS = '/owners',
  ADMIN_PETS = '/pets',
  ADMIN_BREEDS = '/breeds',
  ADMIN_SPECIES = '/species',
  ADMIN_PRESCRIPTIONS = '/prescriptions',
  ADMIN_USERS = '/users',
  ADMIN_NOTES = '/notes',
  ADMIN_REMINDERS = '/reminders',
  ADMIN_CLINICS = '/clinics',
  ADMIN_DASHBOARD = '/dashboard',
  ADMIN_ROLES = '/roles',
  ADMIN_PERMISSIONS = '/permissions',
  ADMIN_PROFILE = '/profile',
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
  {
    title: 'Mis atenciones',
    items: [
      {
        title: 'Atenciones',
        href: EUserRoutingPath.USER_ATTENTIONS,
        iconClass: 'bx bxs-capsule',
        items: [],
      },
    ],
  },
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
        title: 'Atenciones',
        href: EAdminRoutingPath.ADMIN_PERMISSIONS,
        iconClass: 'bx bxs-shield-alt',
        items: [],
      },
      {
        title: 'Historial Médico',
        href: EAdminRoutingPath.ADMIN_MEDICAL_RECORDS,
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
        iconClass: 'bx bxs-paw',
        items: [],
      },
      {
        title: 'Razas',
        href: EAdminRoutingPath.ADMIN_BREEDS,
        icon: 'facebook',
        // iconClass: 'bx bx-vial',
        items: [],
      },
      {
        title: 'Especies',
        href: EAdminRoutingPath.ADMIN_SPECIES,
        iconClass: 'bx bx-vial',
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
        iconClass: 'bx bxs-contact',
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
        iconClass: 'bx bxs-contact',
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
      {
        title: 'Roles',
        href: EAdminRoutingPath.ADMIN_ROLES,
        iconClass: 'bx bx-error',
        items: [],
      },
      {
        title: 'Permisos',
        href: EAdminRoutingPath.ADMIN_PERMISSIONS,
        iconClass: 'bx bxs-hand',
        items: [],
      },
      {
        title: 'Perfil',
        href: EAdminRoutingPath.ADMIN_PROFILE,
        iconClass: 'bx bx-user-circle',
        items: [],
      },
    ],
  },
]

export interface CardStats {
  statSubtitle: string
  statTitle: string
  statArrow: string
  statPercent: string
  statPercentColor: string
  statDescripiron: string
  statIconName: string
  statIconColor: string
}

export const CardStatsOptionsUser: CardStats[] = [
  {
    statSubtitle: 'CITAS PENDIENTES',
    statTitle: '2',
    statArrow: 'up',
    statPercent: '1',
    statPercentColor: 'text-emerald-500',
    statDescripiron: 'Hace 3 días',
    statIconName: 'far fa-chart-bar',
    statIconColor: 'bg-red-500',
  },
  {
    statSubtitle: 'MASCOTAS',
    statTitle: '3',
    statArrow: 'down',
    statPercent: '1',
    statPercentColor: 'text-red-500',
    statDescripiron: 'Hace 1 día',
    statIconName: 'fas fa-dog',
    statIconColor: 'bg-orange-500',
  },
  {
    statSubtitle: 'VISITAS',
    statTitle: '10',
    statArrow: 'down',
    statPercent: '1',
    statPercentColor: 'text-orange-500',
    statDescripiron: 'Ayer',
    statIconName: 'fas fa-users',
    statIconColor: 'bg-pink-500',
  },
  {
    statSubtitle: 'NOTAS',
    statTitle: '2',
    statArrow: 'up',
    statPercent: '1',
    statPercentColor: 'text-emerald-500',
    statDescripiron: 'Hoy',
    statIconName: 'fas fa-percent',
    statIconColor: 'bg-blue-500',
  },
]
export const CardStatsOptionsAdmin: CardStats[] = [
  {
    statSubtitle: 'TRAFFIC',
    statTitle: '350,897',
    statArrow: 'up',
    statPercent: '3.48',
    statPercentColor: 'text-emerald-500',
    statDescripiron: 'Since last month',
    statIconName: 'far fa-chart-bar',
    statIconColor: 'bg-red-500',
  },
  {
    statSubtitle: 'NEW USERS',
    statTitle: '2,356',
    statArrow: 'down',
    statPercent: '3.48',
    statPercentColor: 'text-red-500',
    statDescripiron: 'Since last week',
    statIconName: 'fas fa-chart-pie',
    statIconColor: 'bg-orange-500',
  },
  {
    statSubtitle: 'SALES',
    statTitle: '924',
    statArrow: 'down',
    statPercent: '1.10',
    statPercentColor: 'text-orange-500',
    statDescripiron: 'Since yesterday',
    statIconName: 'fas fa-users',
    statIconColor: 'bg-pink-500',
  },
  {
    statSubtitle: 'PERFORMANCE',
    statTitle: '49,65%',
    statArrow: 'up',
    statPercent: '12',
    statPercentColor: 'text-emerald-500',
    statDescripiron: 'Since last month',
    statIconName: 'fas fa-percent',
    statIconColor: 'bg-blue-500',
  },
]
