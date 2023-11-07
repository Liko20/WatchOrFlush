import { CanActivateFn , Router} from '@angular/router';
const router = new Router()
export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token')

  if(token)
  {
    return true;
  }else{
    router.navigate(['login']);
    return false;
  }
};
