import { RegionesService } from './../../services/regiones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-regiones',
  templateUrl: './lista-regiones.component.html',
  styleUrls: ['./lista-regiones.component.scss'],
})
export class ListaRegionesComponent  implements OnInit {
  regiones: any[] = [];
  regionSeleccionada: any;

  constructor(private regionesService: RegionesService) { }

  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.regionesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }

}
