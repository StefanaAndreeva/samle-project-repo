import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { CustomDetailsListItemComponent } from './custom-details-list-item/custom-details-list-item.component';

@Component({
  selector: 'app-custom-details-list',
  templateUrl: './custom-details-list.component.html',
  styleUrls: ['./custom-details-list.component.scss']
})
export class CustomDetailsListComponent implements AfterContentInit {

  @Input() height!: string;
  @Input() headerText!: string;
  @Input() hasExpandCollapseButtons!: boolean;
  @Input() headerTemplate!: TemplateRef<any>;

  @ContentChildren(CustomDetailsListItemComponent, { read: CustomDetailsListItemComponent })
  items!: QueryList<CustomDetailsListItemComponent>;

  ngAfterContentInit(): void {
    if (this.items && this.hasExpandCollapseButtons) {
      requestAnimationFrame(()=> this.setExpandCollapseState(true));
    }
  }

  expandAll() {
    this.setExpandCollapseState(true);
  }

  collapseAll() {
    this.setExpandCollapseState(false);
  }

  private setExpandCollapseState(expandAll: boolean) {
    this.items.forEach(item => item.isExpanded = expandAll);
  }
}
