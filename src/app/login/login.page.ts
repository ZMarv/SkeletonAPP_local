import { Component, OnInit, ElementRef, ViewChildren, ViewChild} from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AlertController, AnimationController, IonInput, ModalController } from '@ionic/angular';
import { LocalService } from '../services/local.service';

import { Usuario } from '../models/usuario';

import { Router } from '@angular/router';
import {MatInput} from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  checkBoxVencimiento: boolean = false;
  checkBoxTrabajo: boolean = false;
  @ViewChildren(IonInput, { read: ElementRef }) inputs!: QueryList<ElementRef>;
  @ViewChild('fechaNacimiento', { read: MatInput }) fechaNacimiento!: MatInput;
  // @ViewChild('checkBoxVencimiento') checkBoxVencimiento: any;

  private animacionInputs!: Animation;

  constructor(private alertController: AlertController,
    private animationCtrl: AnimationController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localService: LocalService) {}
    usuario:string ='';
    contrasenia: number | null = null;
    nombre: string = '';
    apellido: string = '';
    nivelEducacional: string = '';
    mensajeCerrandoSesion: string = '';
    // fechaNacimiento: string | null = null;
    public alertButtons = ['OK'];

  async mostrar() {
    const alert = await this.alertController.create({
      header: `${this.activatedRoute.snapshot.params["username"]}`,
      message: `Su nombre es ${this.nombre} ${this.apellido}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  ngOnInit() {
    // this.mostrarUsuario();
    this.usuario = this.activatedRoute.snapshot.paramMap.get('username') || '';
    // if (this.compartirDatosService.usuario) {
    //   this.usuario = this.compartirDatosService.usuario;
    // }

  }
  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = '';
    this.fechaNacimiento.value = '';
  }

  // fechaNacimientoChange(event: CustomEvent) {
  //   this.fechaNacimiento = event.detail.value || '';
  // }

  /* mostrarUsuario(){
    this.usuario = this.sharedData.usuario;
  } */
  mostrarUsuario(){
    this.usuario = this.activatedRoute.snapshot.params["username"];

  }

  ngAfterViewInit() {
    this.animacionInputs = this.animationCtrl
    .create()
    .duration(1000)
    .iterations(1)
    .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
    .fromTo('opacity', '1', '0.2');

  }

  ejecutarAnimacion() {
    let transformInicial : string;
    let opacidadInicial : string;

    this.animacionInputs.stop();
    this.inputs.forEach((element: ElementRef) => {
      transformInicial = element.nativeElement.style.transform;
      opacidadInicial = element.nativeElement.style.opacity;
      element.nativeElement.style.transform = 'translateX(0px)';
      element.nativeElement.style.opacity = '1';
      this.animacionInputs.addElement(element.nativeElement);
    });

    this.animacionInputs.play();

    this.animacionInputs.onFinish(() => {
      this.inputs.forEach((element: ElementRef) => {
        element.nativeElement.style.transform = transformInicial;
        element.nativeElement.style.opacity = opacidadInicial;
      });

      this.animacionInputs.stop();
    });
  }

  // cerrarSesion() {
  //   console.log("Cerrando sesión...");
  // this.sharedData.usuario = ''; // Restablecer el valor del usuario al cerrar sesión
  // this.usuario = '';
  // this.contrasenia = null;
  // console.log("Usuario después de cerrar sesión:", this.sharedData.usuario);
  // console.log("Contraseña después de cerrar sesión:", this.sharedData.contrasenia);
  // this.router.navigate(['/home' + this.usuario]);
  // this.router.navigateByUrl("home");
  //  }
  //  cerrarSesion() {
  //   this.mensajeCerrandoSesion = "Cerrando sesión..."; // Establece el mensaje
  // setTimeout(() => {
  //   window.location.href = '/home';
  //   }, 1000);

  // }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrando sesión...',
      message: '¿Seguro de que deseas cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            window.location.href = '/home';
          },
        },
      ],
    });

    await alert.present();
  }

  segment: string = 'misDatos';

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  isSegmentSelected(segment: string): boolean {
    return this.segment === segment;
  }

  // toggleDatepicker(checkbox: any) {
  //   if (checkbox.checked) {
  //     this.checkBoxVencimiento.disabled = false;
  //   } else {
  //     this.checkBoxVencimiento.disabled = true;
  //   }
  // }

}
