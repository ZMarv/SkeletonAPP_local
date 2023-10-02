import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }


  async registro(usuario: string, contrasenia: string): Promise<boolean> {
    try {
      if (await this.usuarioExistente(usuario)) {
        return false;
      }

      const nuevoUsuario: Usuario = {
        usuario: usuario,
        contrasenia: contrasenia
      };

      const usuariosExistente = await Preferences.get({ key: 'usuarios' });
      let usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

      usuarios.push(nuevoUsuario);

      await Preferences.set({ key: 'usuarios', value: JSON.stringify(usuarios) });
      // await Preferences.set({ key: 'email', value: email });
      // await Preferences.set({ key: 'contrasenia', value: contrasenia });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  async usuarioExistente(usuario: string): Promise<boolean> {
    const usuariosExistente = await Preferences.get({ key: 'usuarios' });
    const usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

    return usuarios.some(u => u.usuario === usuario);
  }

  async validarUsuario(usuario: string, contrasenia: string): Promise<boolean> {
    const usuariosExistente = await Preferences.get({ key: 'usuarios' });
    const usuarios: Usuario[] = usuariosExistente.value ? JSON.parse(usuariosExistente.value) : [];

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (usuarioEncontrado) {
      return usuarioEncontrado.contrasenia === contrasenia;
    }
    return false;
  }
}
