import { Component, OnInit } from '@angular/core';
import { MonthlyBudgetService } from '../services/monthly-budget.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetChartComponent } from '../charts/budget-chart/budget-chart.component';

@Component({
  selector: 'app-budget',
  imports: [CommonModule, FormsModule,BudgetChartComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  amount: string = ''
  summary: any = null;
  error: string = '';

  constructor(private _budgetSer: MonthlyBudgetService) { }

  ngOnInit(): void {
    this.getBudgetSummary();
    
  }

  getBudgetSummary() {
    this._budgetSer.getBudgetCompare(this.month, this.year, this.amount).subscribe({
      next: (data) => {
        console.log('budget', data)
        this.summary = data;
        this.error = '';
      },
      error: (err) => {
        this.summary = null;
        this.error = err.error?.error || 'Error fetching budget data';
      }
    });
  }


  submitBudget() {
    if (!this.month || !this.year || !this.amount) {
      this.error = 'Please enter all fields: Month, Year, and Amount.';
      this.summary = null;
      return;
    }
  
    const budgetData = {
      month: this.month,
      year: this.year,
      amount: this.amount
    };
  
    this._budgetSer.createBudget(budgetData).subscribe({
      next: (data) => {
        this.error = '';
        this.getBudgetSummary();
      },
      error: (err) => {
        this.summary = null;
        this.error = err.error?.error || 'Error creating budget.';
      }
    });
  }
}