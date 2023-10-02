import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: string = '';
  // email: string = '';
  contrasenia: string = '';

  constructor(private LocalService: LocalService, private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async registro() {
    if (this.usuario.length < 3 || this.usuario.length > 8) {
      this.alertaCampos('Nombre de usuario inválido', 'El nombre de usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    const regex = /^[0-9]+$/;
    if (!regex.test(this.contrasenia) || this.contrasenia.length !== 4) {
      this.alertaCampos('Contraseña inválida', 'La contraseña debe contener solo números y tener una longitud de 4 caracteres.');
      return;
    }

    if (await this.LocalService.usuarioExistente(this.usuario)) {
      this.alertaUsuarioExistente();
      return;
    }

    const success = await this.LocalService.registro(this.usuario, this.contrasenia);

    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.alertaCampos('Error en el registro', 'Ocurrió un error al intentar registrarse. Por favor, inténtelo de nuevo más tarde.');
    }
  }

  async alertaCampos(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaUsuarioExistente() {
    const alert = await this.alertController.create({
      header: 'Nombre de usuario en uso',
      message: 'El nombre de usuario ya está registrado. Por favor, elige otro nombre de usuario.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
