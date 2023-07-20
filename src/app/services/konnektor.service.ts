import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root',
})
export class KonnektorService {
  constructor() {}
  navListeners: any;
  main: any;
  chartRAM: any;
  chart24: any;
  chart7: any;
  chart30: any;
  chartCPU: any;
  chartCpu24: any;
  chartCpu7: any;
  chartCpu30: any;

  // Navigation Services
  setNavigationListener() {
    this.main = document.querySelector('.main');
    this.navListeners = document.querySelectorAll('.navigation li');
    this.navListeners.forEach((item: any) => {
      item.addEventListener('click', () => {
        this.setActiveNavLink(item);
      });
    });
  }

  getMain(): any {
    this.main = document.querySelector('.main');
    return this.main;
  }

  setMain() {
    this.main.classList.toggle('main-large');
  }

  setActiveNavLink(item: HTMLElement) {
    this.navListeners.forEach((listener: any) => {
      listener.classList.remove('active');
    });
    item.classList.add('active');
  }

  drawRamChart(gradient: any, konnektor: any) {
    // if (this.chartRAM) {
    //   this.chartRAM.destroy();
    // }
    let canvas = 'chartRAM_' + konnektor.id;

    this.chartRAM = new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [
              konnektor.ram_usage_percent,
              100 - konnektor.ram_usage_percent,
            ],
            borderWidth: 1,
            backgroundColor: [gradient, 'rgba(0, 0, 0, 0.2)'],
            circumference: 180,
            rotation: 270,
            borderColor: ['lightgray'],
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        // aspectRatio: 1.2,
        cutout: '80%',

        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
      plugins: [this.gaugeChartText],
    });
    this.chartRAM.update();
  }

  gaugeChartText = {
    id: 'gaugeChartText',
    afterDatasetsDraw(chart: any) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
        scales: { r },
      } = chart;
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      const score = data.datasets[0].data[0];
      let rating;
      score < 80 ? (rating = 'good') : (rating = 'danger');

      this.drawtext('0%', left, yCoor + 10, '10', '300', '#000', 'left', ctx);
      this.drawtext(
        '100%',
        right - 2,
        yCoor + 10,
        '10',
        '300',
        '#000',
        'right',
        ctx
      );
      this.drawtext(
        score + '%',
        xCoor,
        yCoor,
        '20',
        '600',
        '#000',
        'center',
        ctx
      );
      this.drawtext(
        rating,
        xCoor,
        yCoor - 30,
        '10',
        '500',
        rating === 'good' ? 'green' : 'red',
        'center',
        ctx
      );
    },
    drawtext(
      text: any,
      x: any,
      y: any,
      fontSize: any,
      fontWeight: any,
      fontColor: any,
      textAlign: any,
      ctx: any
    ) {
      ctx.font = `${fontWeight} ${fontSize}px  'Montserrat', sans-serif`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = textAlign;
      ctx.fillText(text, x, y);
    },
  };

  drawRam24Chart(konnektor: any) {
    // if (this.chart24) {
    //   this.chart24.destroy();
    // }
    let canvas = 'chart24_' + konnektor.id;
    this.chart24 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.labels_24h,
        datasets: [
          {
            data: konnektor.ram_usage_24h,
            label: '',
            borderColor: '#d70f37',
            backgroundColor: 'rgba(215,15, 55, 0.1)',
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 10,

                family: 'Montserrat',
              },
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
    this.chart24.update();
  }

  drawRam7Chart(konnektor: any) {
    // if (this.chart7) {
    //   this.chart7.destroy();
    // }
    let canvas = 'chart7_' + konnektor.id;

    this.chart7 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.lables_7d,
        datasets: [
          {
            data: konnektor.ram_usage_7d,
            label: '',
            borderColor: '#d70f37',
            backgroundColor: 'rgba(215,15, 55, 0.1)',
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 10,

                family: 'Montserrat',
              },
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
    this.chart7.update();
  }

  drawRam30Chart(konnektor: any) {
    // if (this.chart30) {
    //   this.chart30.destroy();
    // }
    let canvas = 'chart30_' + konnektor.id;
    this.chart30 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.labels_30d,
        datasets: [
          {
            data: konnektor.ram_usage_30d,
            label: '',
            borderColor: '#d70f37',
            backgroundColor: 'rgba(215,15, 55, 0.1)',
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 10,

                family: 'Montserrat',
              },
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
    this.chart30.update();
  }

  drawCpuChart(gradient: any, konnektor: any) {
    let canvas = 'chartCPU_' + konnektor.id;
    this.chartCPU = new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [
              konnektor.cpu_usage_percent,
              100 - konnektor.cpu_usage_percent,
            ],
            borderWidth: 1,
            backgroundColor: [gradient, 'rgba(0, 0, 0, 0.2)'],
            circumference: 180,
            rotation: 270,
            borderColor: ['lightgray'],
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        // aspectRatio: 1.2,
        cutout: '80%',

        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
      plugins: [this.gaugeChartText],
    });
    this.chartCPU.update();
  }

  drawCpu24Chart(konnektor: any) {
    // if (this.chartCpu24) {
    //   this.chartCpu24.destroy();
    // }
    let canvas = 'chartCpu24_' + konnektor.id;
    this.chartCpu24 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.labels_24h,
        datasets: [
          {
            data: konnektor.cpu_usage_24h,
            label: '',
            borderColor: '#d70f37',
            backgroundColor: 'rgba(215,15, 55, 0.1)',
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 10,

                family: 'Montserrat',
              },
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
    this.chartCpu24.update();
  }

  drawCpu7Chart(konnektor: any) {
    let canvas = 'chartCpu7_' + konnektor.id;
    this.chartCpu7 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.lables_7d,
        datasets: [
          {
            data: konnektor.cpu_usage_7d,
            label: '',
            borderColor: '#d70f37',
            backgroundColor: 'rgba(215,15, 55, 0.1)',
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 10,

                family: 'Montserrat',
              },
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
    this.chartCpu7.update();
  }

  drawCpu30Chart(konnektor: any) {
    let canvas = 'chartCpu30_' + konnektor.id;
    this.chartCpu30 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.labels_30d,
        datasets: [
          {
            data: konnektor.cpu_usage_30d,
            label: '',
            borderColor: '#d70f37',
            backgroundColor: 'rgba(215,15, 55, 0.1)',
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 10,

                family: 'Montserrat',
              },
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
    this.chartCpu30.update();
  }
}
