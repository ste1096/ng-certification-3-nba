import { ModalService } from 'src/app/services'

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent {

  @Input() templateRef!: TemplateRef<any>
  @Output() onClickOut = new EventEmitter<any>()

  constructor(protected modalService: ModalService){}

}

