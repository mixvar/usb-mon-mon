import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import IChartsService from '../../../services/charts/charts.service.interface';


@Component({
  selector: 'umm-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  @Input()
  public inputPacketsTicks: number[];

  @Input()
  public outputPacketsTicks: number[];

  @Input()
  public inputDataTicks: number[];

  @Input()
  public outputDataTicks: number[];


  private chartOptions = {
    responsive: true,
    animation: false,
    elements: { point: { radius: 0 } },
    scales: {
      xAxes: [{
        display: true,
        autoSkip: true,
        scaleLabel: {
          display: true,
          labelString: 'time'
        },
        ticks: {
          callback: (dataLabel, index) => ((index === 59 || index % 10 === 0) ? dataLabel : '')
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: '',
        },
      }]
    }
  };

  chartColors = [
    {
      backgroundColor: 'rgba(149, 117, 205, 0.2)',
      borderColor: 'rgba(149, 117, 205, 1)',
    },
    {
      backgroundColor: 'rgba(134, 172, 192, 0.2)',
      borderColor: 'rgba(134, 172, 192, 1)',
    }
  ];

  constructor(private chartService: IChartsService) { }

  ngOnInit() {
  }

  getTicksChartDataset(): Array<any> {
    return [
      { data: this.inputPacketsTicks, label: 'Input packets', borderWidth: 0.9 },
      { data: this.outputPacketsTicks, label: 'Output packets', borderWidth: 0.9 },
    ];
  }

  getDataChartDataset(): Array<any> {
    return [
      { data: this.inputDataTicks, label: 'Read', borderWidth: 0.9 },
      { data: this.outputDataTicks, label: 'Write', borderWidth: 0.9 },
    ];
  }

  getTimeLabels(): string[] {
    // return this.chartService.getChartTimeScale();
    let labels = Array(this.chartService.ticsCount);
    labels.fill('');
    labels = labels.map((label, i) => {
      return (this.chartService.timeScale - i * this.chartService.timeSlice) / 1000 + 's';
    });
    labels[labels.length - 1] = 'now';
    return labels;
  }

  getChartOptions(yAxisLabel) {
    const opts = Object.assign({}, this.chartOptions);
    opts.scales.yAxes[0].scaleLabel.labelString = yAxisLabel;
    return opts;
  };

}

