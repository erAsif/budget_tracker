import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { CommonModule } from '@angular/common';
import { TransactionChartComponent } from '../charts/transaction-chart/transaction-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,TransactionChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;

  constructor(private _transactionsSer: TransactionsService) {}

  ngOnInit(): void {
    this._transactionsSer.getTransactionSummary().subscribe({
      next: (summary) => {
        console.log('testtt',summary)
        this.totalBalance = summary.remaining_balance;
        this.totalIncome = summary.total_income;
        this.totalExpenses = summary.total_expense;
      },
      error: (err) => {
        console.error('Failed to fetch summary:', err);
      }
    });
  }
}
