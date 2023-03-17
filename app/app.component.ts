import { Component, ViewChild } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { sampleProducts } from './products';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'my-app',
  template: `
   <ng-template #template let-anchor>
      <span>{{ anchor.nativeElement.innerText }}</span>
    </ng-template>
   <div kendoTooltip
   showOn="hover"
      showOn="click"
      [tooltipTemplate]="template"
      filter=".k-grid td"
      (mouseover)="showTooltip($event)">
      
<kendo-grid
        [data]="gridData"
        [pageSize]="state.take"
        [skip]="state.skip"
        [sort]="state.sort"
        [filter]="state.filter"
        [sortable]="true"
        [pageable]="true"
        filterable="true"
        [resizable]="true"
        scrollable="none"
        (dataStateChange)="dataStateChange($event)"
    >
    <kendo-grid-column field="ProductID" title="ID" width="40" [filterable]="false">
    </kendo-grid-column>
    <kendo-grid-column field="ProductName" title="Product Name">
    </kendo-grid-column>
    <kendo-grid-column field="FirstOrderedOn" title="First Ordered On" width="240" filter="date" format="{0:d}">
    </kendo-grid-column>
    <kendo-grid-column field="UnitPrice" title="Unit Price" width="180" filter="numeric" format="{0:c}">
    </kendo-grid-column>
    <kendo-grid-column field="Discontinued" width="120" filter="boolean">
        <ng-template kendoGridCellTemplate let-dataItem>
            <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
        </ng-template>
    </kendo-grid-column>
    </kendo-grid>
       </div>
`,
  styles: [`
    .k-grid .k-grid-content td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class AppComponent {
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  public state: State = {
    skip: 0,
    take: 5,
    sort: [
      { dir: 'asc', field: 'ProductName' },
      { dir: 'asc', field: 'FirstOrderedOn' }
    ]
    // Initial filter descriptor

  };

  public gridData: GridDataResult = process(sampleProducts, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(sampleProducts, this.state);
  }

  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (element.offsetWidth < element.scrollWidth) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }
}
