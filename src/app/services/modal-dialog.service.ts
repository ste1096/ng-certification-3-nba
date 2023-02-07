import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  private showDialog = false

  hide() {
    this.showDialog = false
  }

  show(){
    this.showDialog = true
  }

  get isOpen(){
    return this.showDialog
  }
}
