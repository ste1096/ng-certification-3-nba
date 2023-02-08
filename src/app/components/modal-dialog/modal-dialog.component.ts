import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import { ModalService } from '@app/services'

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

