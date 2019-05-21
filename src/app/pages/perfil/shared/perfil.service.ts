import { Injectable } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private userService: UserService, private authService: AuthService) {

  }
}
