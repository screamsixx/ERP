import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotationsModule } from './quotations/quotations.module';
QuotationsModule

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'quotations', loadChildren: () => import('./quotations/quotations.module').then(m => m.QuotationsModule) },
        { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
        { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
        { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SalesRoutingModule { }
