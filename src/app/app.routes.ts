import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BudgetComponent } from './budget/budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
  
    {
      path: '',
      component: MainlayoutComponent,
      canActivate: [AuthGuard], 
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'transactions', component: TransactionsComponent },
        { path: 'budget', component: BudgetComponent },
      ],
    },
  
    { path: '**', component: PagenotfoundComponent, canActivate: [AuthGuard] },
  ];