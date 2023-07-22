import { Injectable, OnInit } from '@angular/core';
import { Chart, registerables, Plugin } from 'chart.js';
import { Konnektor } from '../models/konnektor.class';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root',
})
export class KonnektorService {
  navListeners: any;
  navigation: any;
  main: any;
  chart: any;
  chartRAM: any;
  chartRAM_1: any;
  chartRAM_2: any;
  chart24: any;
  chart7: any;
  chart30: any;
  chartCPU: any;
  chartCpu24: any;
  chartCpu7: any;
  chartCpu30: any;
  horizontal_80_percentage: any;
  borderColor = 'rgba(0, 182, 36, 1)';
  backgroundColor = 'rgba(21,221, 61, 0.1)';

  lineChartOptions = {
    scales: {
      x: {
        ticks: {
          display: false, //this will remove only the label
        },
      },

      y: {
        beginAtZero: true,
        suggestedMax: 100,
        suggestedMin: 0,
        ticks: {
          callback: function (value: any) {
            return value + '%'; // Add your desired unit here
          },
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
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            return value + ' %'; // Add your desired unit here
          },
        },
      },
    },
  };

  // Navigation Services
  setNavigationListener() {
    this.main = document.querySelector('.main');
    this.navigation = document.querySelector('.navigation');
    this.navListeners = document.querySelectorAll('.navigation li');
    this.navListeners.forEach((item: any) => {
      item.addEventListener('click', () => {
        this.setActiveNavLink(item);
        this.navigation.classList.toggle('nav-size');
        console.log('window.innerWidth', window.innerWidth);
        console.log('window.screen.width', window.screen.width);
        if (window.innerWidth < 551 || window.screen.width < 551) {
          this.main.classList.toggle('main-large');
        }
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
    // if (this.chart) {
    //   this.chart.destroy();
    // }

    let canvas = 'chartRAM_' + konnektor.id;
    this.chart = this.chartRAM + '_' + konnektor.id;
    this.chart = new Chart(canvas, {
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
      plugins: [this.chartTextDoughnut],
    });
  }

  chartTextDoughnut = {
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

  chartTextLine = {
    id: 'chartTextLine',
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

      this.drawtext(
        'Critical area',
        width / 2 + 40,
        top + 13,
        '10',
        '400',
        '#fff',
        'center',
        ctx,
        chart
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
      ctx: any,
      chart: any
    ) {
      // ctx.save();
      ctx.fillStyle = 'rgba(215,15,55,0.4)';
      ctx.fillRect(37, 8, chart.chartArea.width, 20);
      // ctx.restore();
      ctx.font = `${fontWeight} ${fontSize}px  'Montserrat', sans-serif`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = textAlign;
      ctx.fillText(text, x, y, chart.chartArea.width);
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
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: this.lineChartOptions,
      plugins: [this.chartTextLine],
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
        labels: konnektor.labels_7d,
        datasets: [
          {
            data: konnektor.ram_usage_7d,
            label: '',
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: this.lineChartOptions,
      plugins: [this.chartTextLine],
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
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: this.lineChartOptions,
      plugins: [this.chartTextLine],
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
      plugins: [this.chartTextDoughnut],
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
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: this.lineChartOptions,
      plugins: [this.chartTextLine],
    });
    this.chartCpu24.update();
  }

  drawCpu7Chart(konnektor: any) {
    let canvas = 'chartCpu7_' + konnektor.id;
    this.chartCpu7 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: konnektor.labels_7d,
        datasets: [
          {
            data: konnektor.cpu_usage_7d,
            label: '',
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: this.lineChartOptions,
      plugins: [this.chartTextLine],
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
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fill: true,
            borderWidth: 0.6,
            tension: 0.4,
          },
        ],
      },
      options: this.lineChartOptions,
      plugins: [this.chartTextLine],
    });
    this.chartCpu30.update();
  }
}
