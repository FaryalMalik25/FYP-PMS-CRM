/*import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};*/
import { CanActivateFn } from '@angular/router';

import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const AuthGuard:CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  if(inject(AuthService).isLoggedIn){
  return true;
  }else
  {
    inject(Router).navigate(['/login']);
    return false;
  }

};
