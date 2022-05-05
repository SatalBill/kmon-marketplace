import React, { useEffect, useState } from 'react'
import {Chart} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2'
import { Props } from './DNAChartDefault.types'
import './DNAChartDefault.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
// Chart.register(ChartDataLabels);
const DNAChartDefault = (props: Props) => {
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

  const newData = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      }
    ]
  }

  const data = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: DNAValues
      }
    ]
  }

  const newOptions = {
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
        formatter: function(value: any, context: any) {
          console.log('Formatter--->', value, context)
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
        ticks: {
          display: false,
          autoSkip: true,
          maxRotation: -90,
          minRotation: -90,
          padding: -10,
          labelOffset: 25,
          color: '#F231AF',
          align: 'start',
          backgroundColor: '#FF0000',
          backdropColor: 'red',
          font: {
            size: 11,
            color: '#ffff',
            family: 'Poppins'
          },
          callback: () => {
            return '';
          }
        },
        grid: {
          color: ['#D8D8D8', '#D8D8D8', '#D8D8D8', '#D8D8D8'],
          backgroundColor: ['black', 'red', 'orange', '#D8D8D8'],
          lineWidth: 0
        },
        pointLabels: {
          padding: 20,
          color: '#fff',
          font: {
            size: windowWidth > 480 ? 12 : 9,
            weight: windowWidth > 480 ? 'bold' : '400',
            family: 'Poppins'
          }
        }
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
    <div className="dna-container-1">
      <Radar
        className="dna-chart-1"
        width={screen == 0 ? 678 : 400}
        height={isMobile() ? 400 : 210}
        data={newData}
        options={newOptions}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}

export default React.memo(DNAChartDefault)
