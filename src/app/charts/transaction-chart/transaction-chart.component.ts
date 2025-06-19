import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction-chart',
  imports: [],
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.css']  // ✅ fixed key from `styleUrl` to `styleUrls`
})

export class TransactionChartComponent implements OnInit {

  constructor(private _transactionsSer: TransactionsService) {}

  ngOnInit(): void {
    this._transactionsSer.getTransactionSummary().subscribe({
      next: (summary) => {
        console.log('Transaction Summary:', summary);

        const pieData = [
          { label: 'Income', value: summary.total_income },
          { label: 'Expense', value: summary.total_expense },
          { label: 'Remaining', value: summary.remaining_balance }
        ];

        this.createPieChart(pieData); // ✅ pass dynamic data here
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