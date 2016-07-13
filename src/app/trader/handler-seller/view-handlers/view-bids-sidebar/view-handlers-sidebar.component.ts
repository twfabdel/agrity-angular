import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandlerSeller } from '../../shared/index';

@Component({
  selector: 'sg-view-handlers-sidebar',
  styleUrls:
      ['app/trader/handler-sellers/view-handlers/view-handlers-sidebar/view-handlers-sidebar.component.css'],
  templateUrl:
      'app/trader/handler-sellers/view-handlers/view-handlers-sidebar/view-handlers-sidebar.component.html',
})
export class ViewHandlersSidebarComponent {

  @Output()
  public onSelect = new EventEmitter<HandlerSeller>();

  private recievedHandlerSellers: HandlerSeller[];
  private selectedHandler: HandlerSeller;

  @Input()
  set handlerSellers(handlerSellers: HandlerSeller[]) {
    this.recievedHandlerSellers = handlerSellers;
  }

  /* NOTE: Called in .html file. */
  protected selectHandler(handler: HandlerSeller): void {
    this.selectedHandler = handler;
    this.onSelect.emit(handler);
  }
}
