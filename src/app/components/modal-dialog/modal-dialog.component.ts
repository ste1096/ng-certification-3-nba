import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core'

import { ModalDialogService } from '../../services/modal-dialog.service'

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {

  @Input() templateRef!: TemplateRef<any>
  @Output() onClickOut = new EventEmitter<any>()

  constructor(protected modalDialogService: ModalDialogService){}

}

