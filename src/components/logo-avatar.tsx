import logoPng from '@/img/logo.webp'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const LogoAvatar = () => (
  <Avatar className="h-12 w-12">
    <AvatarImage alt="logo" src={logoPng.src} />
    <AvatarFallback>logo</AvatarFallback>
  </Avatar>
)

export default LogoAvatar
