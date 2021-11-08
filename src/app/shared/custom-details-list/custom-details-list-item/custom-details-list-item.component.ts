import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ICustomDetailsListItemSelectedEventArg {
  value: boolean;
  item: CustomDetailsListItemComponent;
}

@Component({
  selector: 'app-custom-details-list-item',
  templateUrl: './custom-details-list-item.component.html',
  styleUrls: ['./custom-details-list-item.component.scss'],
  animations: [
    trigger('highlightSelected', [
      transition('* => selected', animate('1000ms', keyframes([
        style({backgroundColor: 'initial', boxShadow: 'none', offset: 0}),
        style({backgroundColor: '#bcbccb', boxShadow: '0 0 5px #bcbccb', offset: 0.1}),
        style({backgroundColor: 'initial', boxShadow: 'none', offset: 1} ),
      ])))
    ]),
    trigger('openClose', [
      state('open', style({height: '*', opacity: 1, visibility: 'visible'})),
      state('closed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
      transition('open <=> closed',
        animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ])
  ],
})
export class CustomDetailsListItemComponent {

  @Input() text!: string;
  @Input() hasShowDetailsButton!: boolean;
  @Input() isSelected!: boolean;

  @Output() itemSelected = new EventEmitter<ICustomDetailsListItemSelectedEventArg>();
  @Output() showDetails = new EventEmitter<CustomDetailsListItemComponent>();

  isExpanded = false;
  showContent = false;

  get icon() {
    return this.isExpanded ? 'expand_more' : 'expand_less'
  }

  onClick() {
    this.isExpanded = !this.isExpanded;
    this.itemSelected.emit({
      value:this.isExpanded,
      item: this
    });
  }

  onButtonClick(event: any) {
    event.stopPropagation();
    this.showDetails.emit(this);
  }
}
