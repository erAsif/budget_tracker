import { Component } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule,FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  // categories: string[] = ['Salary', 'Groceries', 'Entertainment', 'Utilities', 'Others'];

  newTransaction = {
    amount: null,
    category: '',
    date: ''
  };

  filter = {
    date: '',
    category: '',
    amount: null
  };

  allTransactions: any[] = [];
  allCategory: any[] = [];
  editingTransaction: any = null;

  currentPage = 1;
  pageSize = 5;

  constructor(
    private _transactionsSer: TransactionsService,
    private _categorySer: CategoryService
  ) {}

  ngOnInit(): void {
    this._transactionsSer.getAllTransaction().subscribe({
      next: (response) => {
        this.allTransactions = response;
      },
      error: (err) => {
        console.error('Failed to fetch All Transactions:', err);
      }
    });

    this._categorySer.getAllCategory().subscribe({
      next: (response) => {
        this.allCategory = response;
      },
      error: (err) => {
        console.error('Failed to fetch Category:', err);
      }
    });
  }

  addTransaction() {
    if (this.newTransaction.amount && this.newTransaction.category && this.newTransaction.date) {
      this._transactionsSer.addTransaction(this.newTransaction).subscribe({
        next: (response) => {
          this.allTransactions.push(response);
          this.newTransaction = { amount: null, category: '', date: '' };
        },
        error: (err) => {
          console.error('Failed to add transaction:', err);
        }
      });
    }
  }

  editTransaction(trans: any) {
    this.editingTransaction = { ...trans };
  }

  cancelEdit() {
    this.editingTransaction = null;
  }

  saveEditedTransaction() {
    this._transactionsSer.updateTransaction(this.editingTransaction.id, this.editingTransaction).subscribe({
      next: (updated) => {
        const index = this.allTransactions.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          this.allTransactions[index] = updated;
        }
        this.editingTransaction = null;
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }

  deleteTransaction(id: number) {
    this._transactionsSer.deleteTransaction(id).subscribe({
      next: () => {
        this.allTransactions = this.allTransactions.filter(t => t.id !== id);
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
  }

  applyFilters() {
    this.currentPage = 1;
  }

  get filteredTransactions() {
    return this.allTransactions.filter(t => {
      return (!this.filter.date || t.date === this.filter.date) &&
             (!this.filter.category || t.category === this.filter.category) &&
             (!this.filter.amount || t.amount == this.filter.amount);
    });
  }

  paginatedTransactions() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTransactions.slice(start, start + this.pageSize);
  }

  hasMorePages() {
    return this.currentPage * this.pageSize < this.filteredTransactions.length;
  }

  nextPage() {
    if (this.hasMorePages()) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}