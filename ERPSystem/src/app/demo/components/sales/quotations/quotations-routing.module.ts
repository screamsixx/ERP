import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotationsComponent } from './quotations.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: QuotationsComponent }
	])],
	exports: [RouterModule]
})
export class QuotationsRoutingModule { }
