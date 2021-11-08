import { NgModule } from '@angular/core';
import { InitialsPipe } from './initials.pipe';
import { SearchPipe } from './search.pipe';


@NgModule({
    declarations: [
      InitialsPipe,
      SearchPipe
    ],
    imports: [],
    exports: [
      InitialsPipe,
      SearchPipe
    ],
    providers: [
      InitialsPipe,
      SearchPipe
    ]
})
export class PipesModule { }
