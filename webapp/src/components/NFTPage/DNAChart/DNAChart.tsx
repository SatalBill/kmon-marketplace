import React, { useEffect, useState } from 'react'
import {Chart} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2'
import { Props } from './DNAChart.types'
import './DNAChart.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

// Chart.register(ChartDataLabels);
const DNAChart = (props: Props) => {
  const { nft, isV2 } = props
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [screen, setScreen] = useState(0);

  const genesV2Values = [
    nft.genesV2?.attack,
    nft.genesV2?.defense,
    nft.genesV2?.speed,
    nft.genesV2?.ego,
    nft.genesV2?.healthPoints,
    nft.genesV2?.constitution,
    nft.genesV2?.affections,
    nft.genesV2?.crazyness,
    nft.genesV2?.instinct,
    nft.genesV2?.hunger,
    nft.genesV2?.brave,
    nft.genesV2?.smart
  ]

  const genesValues = [
    nft.data.kryptomon!.genes.attack,
    nft.data.kryptomon!.genes.defense,
    nft.data.kryptomon!.genes.speed,
    nft.data.kryptomon!.genes.ego,
    nft.data.kryptomon!.genes.healthPoints,
    nft.data.kryptomon!.genes.constitution,
    nft.data.kryptomon!.genes.affections,
    nft.data.kryptomon!.genes.crazyness,
    nft.data.kryptomon!.genes.instinct,
    nft.data.kryptomon!.genes.hunger,
    nft.data.kryptomon!.genes.brave,
    nft.data.kryptomon!.genes.smart
  ]

  const DNAValues = isV2
    ? genesV2Values
    : genesValues

  const DNAGeneration = nft.data.kryptomon?.genes.generation
  const isDNAUnfreezable = nft.data.kryptomon?.extraData.unfreezable

  useEffect(() => {
    window.innerWidth > 1201 || window.innerWidth < 768 ? setScreen(0) : setScreen(1);
    function handleResize() {
      window.innerWidth > 1201 || window.innerWidth < 768 ? setScreen(0) : setScreen(1);
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const data = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: DNAValues,
        fillColor: "rgb(54, 162, 235)",
        strokeColor: "rgb(54, 162, 235)",
        pointColor: "rgb(54, 162, 235)",
        pointRadius: windowWidth > 480 ? 2 : 1,
        pointBorderWidth: windowWidth > 480 ? 2 : 1,
        borderWidth: windowWidth > 480 ? 2 : 1,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        dataLabels: {
          display: true
        },
      }
    ]
  }

  const options = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      },
      datalabels: {
        borderWidth: 1,
        color: '#000',
        font: {
          size: windowWidth > 480 ? 11 : 8,
          weight: 'bold',
          color: '#000',
          family: 'PT Mono'
        },
        formatter: function(context: any) {
          return DNAValues[context.dataIndex];
        },
        anchor: function (context: any) {
          var value = context.dataset.data[context.dataIndex];
          return value.x < 1000 ? 'end' : 'center';
        },
        align: function (context: any) {
          var value = context.dataset.data[context.dataIndex];
          return value.x < 1000 ? 'end' : 'center';
        },
        borderColor: function (context: any) {
          return DNA_COLORS[context.dataIndex];
        },
        backgroundColor: function (context: any) {
          var value = context.dataset.data[context.dataIndex];
          return DNA_COLORS[context.dataIndex];
        },
        borderRadius: 2,
        textAlign: 'center',
        offset: -100,
        padding: {
          top: 4,
          left: 6,
          bottom: 4,
          right: 6
        }
      }
    },
    scales: {
      r: {
        lineWidth: 50,
        ticks: {
          color: '#ffff',
          backdropColor: '#ffffff00',
          opacity: 0.5,
          font: {
            size: windowWidth > 480 ? 10 : 8,
            weight: windowWidth > 480 ? 'bold' : 200,
            color: '#ffff',
            family: 'Poppins'
          }
        },
        angleLines: {
          display: false
        },
        grid: {
          drawBorder: false,
          fillColor: "rgb(54, 162, 235)",
          strokeColor: "rgb(54, 162, 235)",
          color: ['#393838', '#2F2F2E', '#232223', '#141514', '#070706'],
          lineWidth: windowWidth > 480 ? [120, 60, 60, 50, 0] : [50, 60, 30, 20, 0]
        },
        pointLabels: {
          padding: 40,
          color: '#fff',
          font: {
            size: 12,
            family: 'Poppins'
          },
          callback: () => {
            return ''
          }
        }
      }
    }
  }

  const plugin = {
    id: 'dna-chart',
    beforeDraw: (chart : any) => {
      const ctx = chart.canvas.getContext('2d');
      ctx.save();

      //Draw rounded rect
      function roundRect(ctx: any, x: any, y: any, width: any, height: any, radius: any, fill: any, stroke: any) {
        if (typeof stroke == "undefined" ) {
          stroke = true;
        }
        if (typeof radius === "undefined") {
          radius = 5;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (stroke) {
          ctx.stroke();
        }
        if (fill) {
          ctx.fill();
        }        
      }

      chart.scales.r._pointLabelItems.forEach(function(data: any, index: any) {
        var dataX = data.x;
        var dataY = data.y;
        var roundRectX = data.x;
        var roundRectY = data.y;

        if (index === 0) {
          roundRectX = data.x - 15;
          roundRectY = data.y + 20;
          dataX = data.x - 20;
          dataY = data.y + 10;
        } else if (index === 9) {
          roundRectX = data.x;
          roundRectY = data.y + 20;
          dataX = data.x + 10;
        } else if (index === 6) {
          roundRectX = data.x - 15;
          roundRectY = data.y - 20;
          dataY = data.y + 10 ;
        } else if (index === 5) {
          roundRectX = data.x - 15;
          roundRectY = data.y - 5;
          dataX = data.x;
          dataY = data.y - 15;
        } else if (index === 7) {
          roundRectX = data.x - 15;
          roundRectY = data.y - 5;
          dataX = data.x;
          dataY = data.y - 15;
        } else {
          roundRectX = data.x - 15;
          roundRectY = data.y + 20;
        }

        ctx.font = windowWidth > 480 ? "12px Poppins" : "lighter 10px Poppins";
        ctx.fillStyle = "#ffff";
        ctx.fillText(t(`nft_page.dna_chart.${DNA_CONSTANTS[index]}`), dataX, dataY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = DNA_COLORS[index];
        ctx.fillStyle = DNA_COLORS[index];

        roundRect(ctx, roundRectX, roundRectY, 25, 20, 3, 1, true);
        ctx.font = windowWidth > 480 ? "300 12px Poppins" : "lighter 10px Poppins";
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center"; 
        var rectHeight = 20;
        var rectWidth = 25;
        var rectX =  roundRectX;
        var rectY = roundRectY;
        ctx.fillText(DNAValues[index], rectX+(rectWidth/2),rectY+(rectHeight/2)+2.5);
      })
      ctx.restore();
    }
  };

  return (
    <div className="dna-container">
      <div className="dna-info">
        <div className="dna-info-generation">Generation: {DNAGeneration}</div>
        {isDNAUnfreezable && (
          <img src={Star} alt="star-icon" className="dna-info-start" />
        )}
      </div>
      <Radar
        id="dna-chart"
        className="dna-chart"
        width={screen == 0 ? 678 : 400}
        height={isMobile() ? 400 : 210}
        data={data}
        options={options}
        plugins={[plugin]}
      />
    </div>
  )
}

export default React.memo(DNAChart)
