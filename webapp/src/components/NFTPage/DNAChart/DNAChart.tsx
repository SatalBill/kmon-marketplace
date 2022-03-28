import React, { useEffect, useState } from 'react'
import {Chart} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2'
import { Props } from './DNAChart.types'
import './DNAChart.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
Chart.register(ChartDataLabels);
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
      }
    ]
  }

  const options = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20,
      gridLines: {
        lineWidth: 10,
        color: ['black', 'red', 'orange', 'yellow']
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    },
    scales: {
      r: {
        ticks: {
          autoSkip: true,
          maxRotation: -90,
          minRotation: -90,
          padding: -10,
          labelOffset: 25,
          color: '#F231AF',
          align: 'start',
          backgroundColor: '#FF0000',
          // color: '#fff',
          font: {
            size: 11,
            color: '#ffff',
            family: 'Poppins'
          }
        },
        grid: {
          color: ['#D8D8D8', '#D8D8D8', '#D8D8D8', '#D8D8D8'],
          backgroundColor: ['black', 'red', 'orange', '#D8D8D8'],
          lineWidth: [1, 1, 1, 1, 1]
        },
        pointLabels: {
          padding: 40,
          paddingLeft: 60,
          color: '#fff',
          font: {
            size: 12,
            family: 'Poppins'
          },
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
      <div className="dna-info">
        <div className="dna-info-generation">Generation: {DNAGeneration}</div>
        {isDNAUnfreezable && (
          <img src={Star} alt="star-icon" className="dna-info-start" />
        )}
      </div>
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
