import React, { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { Button } from '@kmon/ui'
import { Radar } from 'react-chartjs-2'
import { fromWei } from 'web3x-es/utils'

import { Props } from './Fee.types'
import './Fee.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../../modules/nft/constants'

const Fee = (props: Props) => {
  const { myNFT, selectedNFT, isBreeding, breedingPrice, selectedBreedingOrder, onBreed, onCancel } = props
  const [totalBreedingPrice, setTotalBreedingPrice] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    if (breedingPrice && selectedBreedingOrder) {
      if (myNFT.owner === selectedNFT.owner) {
        setTotalBreedingPrice(BigNumber.from(breedingPrice).toString())
      } else {
        setTotalBreedingPrice(BigNumber.from(breedingPrice).add(BigNumber.from(selectedBreedingOrder.price)).toString())
      }
    } else {
      setTotalBreedingPrice(null)
    }
  }, [breedingPrice, selectedBreedingOrder])

  const myNFTValues = [
    myNFT.data.kryptomon?.genes.attack,
    myNFT.data.kryptomon?.genes.defense,
    myNFT.data.kryptomon?.genes.speed,
    myNFT.data.kryptomon?.genes.ego,
    myNFT.data.kryptomon?.genes.healthPoints,
    myNFT.data.kryptomon?.genes.constitution,
    myNFT.data.kryptomon?.genes.affections,
    myNFT.data.kryptomon?.genes.crazyness,
    myNFT.data.kryptomon?.genes.instinct,
    myNFT.data.kryptomon?.genes.hunger,
    myNFT.data.kryptomon?.genes.brave,
    myNFT.data.kryptomon?.genes.smart
  ]

  const myNFTData = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: myNFTValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        pointRadius: 1,
        pointBorderWidth: 1,
        borderWidth: 1,
      }
    ]
  }

  const myNFTOptions = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20
    },
    scales: {
      r: {
        ticks: {
          color: '#ffff',
          backdropColor: '#ffffff00',
          opacity: 0.5,
          font: {
            size: 8,
            weight: '200',
            color: '#ffff',
            family: 'Poppins'
          }
        },
        angleLines: {
          display: false
        },
        grid: {
          color: ['#393838', '#2F2F2E', '#232223', '#141514', '#242129'],
          lineWidth: windowWidth > 768 ? windowWidth > 995 ? [30, 20, 20, 20, 10] :  [120, 60, 60, 50, 0] :  windowWidth > 480 ? [120, 60, 60, 50, 0] : [50, 60, 30, 20, 0]
        },
        pointLabels: {
          padding: 30,
          color: '#fff',
          font: {
            size: 10,
            weight: 'bold',
            family: 'Poppins'
          },
          callback: () => {
            return ''
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    }
  }

  const myNFTplugin = {
    id: 'dna-chart-mynft',
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

        ctx.font = windowWidth < 480 ? "12px Poppins" : "lighter 8px Poppins";
        ctx.fillStyle = "#ffff";
        ctx.fillText(DNA_CONSTANTS[index], dataX, dataY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = DNA_COLORS[index];
        ctx.fillStyle = DNA_COLORS[index];

        roundRect(ctx, roundRectX, roundRectY, 25, 20, 3, 1, true);
        ctx.font = windowWidth < 480 ? "300 12px Poppins" : "lighter 10px Poppins";
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center"; 
        var rectHeight = 20;
        var rectWidth = 25;
        var rectX =  roundRectX;
        var rectY = roundRectY;
        ctx.fillText(myNFTValues[index], rectX+(rectWidth/2),rectY+(rectHeight/2)+2.5);
      })
      ctx.restore();
    }
  };

  const selectedNFTData = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: [
          selectedNFT.data.kryptomon?.genes.attack,
          selectedNFT.data.kryptomon?.genes.defense,
          selectedNFT.data.kryptomon?.genes.speed,
          selectedNFT.data.kryptomon?.genes.ego,
          selectedNFT.data.kryptomon?.genes.healthPoints,
          selectedNFT.data.kryptomon?.genes.constitution,
          selectedNFT.data.kryptomon?.genes.affections,
          selectedNFT.data.kryptomon?.genes.crazyness,
          selectedNFT.data.kryptomon?.genes.instinct,
          selectedNFT.data.kryptomon?.genes.hunger,
          selectedNFT.data.kryptomon?.genes.brave,
          selectedNFT.data.kryptomon?.genes.smart
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        pointRadius: 1,
        pointBorderWidth: 1,
        borderWidth: 1,
      }
    ]
  }

  const selectedNFTOptions = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20
    },
    scales: {
      r: {
        ticks: {
          color: '#ffff',
          backdropColor: '#ffffff00',
          opacity: 0.5,
          font: {
            size: 8,
            weight: '200',
            color: '#ffff',
            family: 'Poppins'
          }
        },
        angleLines: {
          display: false
        },
        grid: {
          color: ['#393838', '#2F2F2E', '#232223', '#141514', '#242129'],
          lineWidth: windowWidth > 768 ? windowWidth > 995 ? [30, 20, 20, 20, 10] :  [120, 60, 60, 50, 0] :  windowWidth > 480 ? [120, 60, 60, 50, 0] : [50, 60, 30, 20, 0]
        },
        pointLabels: {
          padding: 30,
          color: '#fff',
          font: {
            size: 8,
            weight: 'bold',
            family: 'Poppins'
          },
          callback: () => {
            return ''
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    }
  }

  const selectedNFTplugin = {
    id: 'dna-chart-selectednft',
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
          roundRectY = data.y - 25;
          dataY = data.y + 5 ;
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

        ctx.font = windowWidth < 480 ? "12px Poppins" : "lighter 8px Poppins";
        ctx.fillStyle = "#ffff";
        ctx.fillText(DNA_CONSTANTS[index], dataX, dataY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = DNA_COLORS[index];
        ctx.fillStyle = DNA_COLORS[index];

        roundRect(ctx, roundRectX, roundRectY, 25, 20, 3, 1, true);
        ctx.font = windowWidth < 480 ? "300 12px Poppins" : "lighter 10px Poppins";
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center"; 
        var rectHeight = 20;
        var rectWidth = 25;
        var rectX =  roundRectX;
        var rectY = roundRectY;
        ctx.fillText(myNFTValues[index], rectX+(rectWidth/2),rectY+(rectHeight/2)+2.5);
      })
      ctx.restore();
    }
  };

  const classes = ['kryptomon', 'breeding-modal-fee']
  return (
    <div className={classes.join(" ")}>
      <div className="my-kryptomon">
        <Radar
          id="dna-chart-mynft"
          className="dna-chart-mynft"
          width={670} height={400} 
          data={myNFTData}
          options={myNFTOptions}
          plugins={[myNFTplugin]}
        />
      </div>
      <div className="fee-detail">
        <div className="fee-detail-info">
          Breeding Fee: {breedingPrice ? Math.round((parseFloat(fromWei(breedingPrice, 'ether')) + Number.EPSILON) * 100) / 100 : ''} KMON<br />
          Total Cost: {totalBreedingPrice ? Math.round((parseFloat(fromWei(totalBreedingPrice, 'ether')) + Number.EPSILON) * 100) / 100 : ''} KMON
        </div>
        <Button primary className="breed-button" onClick={onBreed} loading={isBreeding} disabled={isBreeding}>BREED</Button>
        <Button onClick={onCancel}>CANCEL</Button>
      </div>
      <div className="selected-kryptomon">
        <Radar
          id="dna-chart-selectednft"
          className="dna-chart-selectednft"
          width={670} height={450} 
          data={selectedNFTData}
          options={selectedNFTOptions}
          plugins={[selectedNFTplugin]}
        />
      </div>
    </div>
  )
}

export default React.memo(Fee)
