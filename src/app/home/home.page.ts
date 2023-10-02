import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  contrasenia: string = '';
  // contrasenia: number | null = null;

  constructor(
    private router:Router,private localService: LocalService,
    private alertController: AlertController) {}
    
  // guardar(){
  //   // this.sharedData.usuario = this.usuario;
  //   // this.usuario =this.compartirDatosService.usuario;
  //   this.router.navigateByUrl("login/" + this.usuario);
  // }
  async guardar() {
    const usuarioValido = await this.localService.validarUsuario(this.usuario, this.contrasenia);

    if (usuarioValido) {
      this.router.navigate(['/login', { username: this.usuario }]);
    } else {
      this.alertaDatos();
      console.error('Usuario y/o contraseña no válidos');
    }
  }

  async alertaDatos() {
    const alert = await this.alertController.create({
      header: 'Datos Incorrectos',
      message: 'Usuario y/o contraseña incorrectos',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
