import React, { useEffect, useState } from 'react'
import {Chart} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2'
import { Props } from './DNAChart.types'
import './DNAChart.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
// Chart.register(ChartDataLabels);
const DNAChart = (props: Props) => {
  const { nft, isV2 } = props
  const [windowWidth, setWindowWidth] = useState(0);

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

  const data = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: DNAValues,
        fillColor: "rgb(54, 162, 235)",
        strokeColor: "rgb(54, 162, 235)",
        pointColor: "rgb(54, 162, 235)",
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        dataLabels: {
          display: false
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
        formatter: function(value: any, context: any) {
          console.log('Formatter--->', value, context)
          return '';
        }
      }
    },
    scales: {
      r: {
        ticks: {
          color: '#ffff',
          backdropColor: '#ffffff00',
          opacity: 0.5,
          font: {
            size: 10,
            weight: 'bold',
            color: '#ffff',
            family: 'Poppins'
          }
        },
        angleLines: {
          display: false
        },
        grid: {
          color: ['#393838', '#2F2F2E', '#232223', '#151515', '#060606'],
          backgroundColor: ['black', 'red', 'orange', '#D8D8D8'],
          lineWidth: [100, 50, 50, 50, 0]
        },
        pointLabels: {
          padding: 40,
          paddingLeft: 60,
          color: '#fff',
          font: {
            size: 12,
            family: 'Poppins'
          },
          callback: (label: any, b: any, c: any) => {
            console.log('Point callback--->', label, b, c)
            return ``
          }
        }
      }
    },
    plugin: {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart: any) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'lightGreen';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    }
  }

  const [screen, setScreen] = useState(0);

  useEffect(() => {
    window.innerWidth > 1201 || window.innerWidth < 768 ? setScreen(0) : setScreen(1);
    function handleResize() {
      window.innerWidth > 1201 || window.innerWidth < 768 ? setScreen(0) : setScreen(1);
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  return (
    <div className="dna-container">
      <Radar
        className="dna-chart"
        width={screen == 0 ? 678 : 400}
        height={isMobile() ? 400 : 210}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}

export default React.memo(DNAChart)
