import React from 'react'
import { Props } from './PriceChart.types'
import './PriceChart.css'
import { Line } from 'react-chartjs-2'

const PriceChart = (props: Props) => {
  const { nft } = props

  const dataCanvas = (canvas: any) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 180)
    gradient.addColorStop(0, 'rgba(242,49,175,0.3)')
    gradient.addColorStop(1, 'rgba(242,49,175,0)')

    return {
      labels: [
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '00:00',
        'asd',
        'asd'
      ],
      datasets: [
        {
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(0, 0, 0, 0)',
          pointHoverBackgroundColor: '#F231AF',
          pointHoverBorderColor: '#FFFFFF',
          lineTension: 0.4,
          fill: 'start',
          backgroundColor: gradient,
          borderColor: '#F231AF',
          borderWidth: 2,
          pointColor: '#fff',
          data: [
            25.0,
            32.4,
            22.2,
            39.4,
            34.2,
            22.0,
            23.2,
            24.1,
            20.0,
            18.4,
            19.1,
            17.4
          ]
        }
      ]
    }
  }

  const optionsCanvas = {
    tooltips: {
      enabled: false,
      mode: 'x',
      intersect: false
    },
    elements: {
      point: {
        pointStyle: 'circle',
        hoverRadius: 7
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        caretPadding: 100,
        caretSize: 105,
        external: function(context: any) {
          let tooltipEl = document.getElementById('chartjs-tooltip')

          if (!tooltipEl) {
            tooltipEl = document.createElement('div')
            tooltipEl.id = 'chartjs-tooltip'
            tooltipEl.innerHTML = '<table></table>'
            document.body.appendChild(tooltipEl)
          }

          let tooltipModel = context.tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0'
            return
          }

          tooltipEl.classList.remove('above', 'below', 'no-transform')
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
          } else {
            tooltipEl.classList.add('no-transform')
          }

          function getBody(bodyItem: any) {
            return bodyItem.lines
          }

          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || []
            const bodyLines = tooltipModel.body.map(getBody)

            let innerHtml = '<thead>'

            titleLines.forEach(function(title: any) {
              innerHtml += '<tr><th>' + title + '</th></tr>'
            })
            innerHtml += '</thead><tbody>'

            bodyLines.forEach(function(body: any, i: any) {
              console.log(body)

              const colors = tooltipModel.labelColors[i]
              let style = 'background:' + colors.backgroundColor
              style += '; border-color:' + colors.borderColor
              style += '; border-width: 2px'
            })
            innerHtml += '</tbody>'

            const tableRoot = tooltipEl.querySelector('table')
            if (tableRoot) {
              tableRoot.innerHTML = innerHtml
            }
          }

          const position = context.chart.canvas.getBoundingClientRect()
          tooltipEl.style.opacity = '1'
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX - 34 + 'px'
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY - 45 + 'px'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          color: '#676370',
          align: 'start',
          font: {
            size: 16,
            family: 'PT-Mono'
          }
        },
        legend: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          beginAtZero: true,
          min: 0,
          max: 100,
          precision: 0,
          stepSize: 25,
          callback: (value: number) => {
            return value + '%'
          },
          color: '#676370',
          font: {
            size: 11,
            family: 'PT-Mono'
          }
        }
      }
    }
  }
  return (
    <div className="dna-container">
      <Line
        width={678}
        height={210}
        data={dataCanvas}
        options={optionsCanvas}
      />
    </div>
  )
}
export default React.memo(PriceChart)
