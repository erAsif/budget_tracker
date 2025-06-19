import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { MonthlyBudgetService } from '../../services/monthly-budget.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-chart',
  imports: [FormsModule,CommonModule],
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})
export class BudgetChartComponent implements OnInit {

  constructor(private _budgetSer: MonthlyBudgetService) {}

  ngOnInit(): void {
    const currentMonth = new Date().getMonth() + 1; // JS month is 0-indexed
    const currentYear = new Date().getFullYear();
    const defaultAmount = '10000'; // You can update this based on your use case
  
    this._budgetSer.getBudgetCompare(currentMonth, currentYear, defaultAmount).subscribe({
      next: (summary) => {
        console.log('Transaction Summary:', summary);
       
        const pieData = [
          { label: 'Income', value: summary.budgeted_amount || 0 },
          { label: 'Expense', value: summary.actual_expense || 0 },
          { label: 'Remaining', value: summary.remaining_balance || 0 }
        ];
  
        this.createPieChart(pieData);
      },
      error: (err) => {
        console.error('Failed to fetch summary:', err);
      }
    });
  }

  private createPieChart(data: any[]): void {
    const width = 400;
    const height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // ✅ Clear any existing chart (important if this runs multiple times)
    d3.select("#pieChart").selectAll("*").remove();

    const svg = d3.select("#pieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(["#4CAF50", "#F44336", "#2196F3"]);

    const pie = d3.pie<any>().value(d => d.value);
    const data_ready = pie(data);

    const arc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label) as string)
      .attr("stroke", "#fff")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => `${d.data.label}: ${d.data.value}`)
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px");
  }
}