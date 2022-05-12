import React from 'react'
import './Community.css'
import { facebook, medium, telegram, linkedin, twitter, discord, reddit, instagram } from '../../../images/community'

// type Props = {}

const communityData = [
    { id: 1, icon: facebook, amount: 58, unit: 'followers' },
    { id: 2, icon: medium, amount: 2.7, unit: 'followers' },
    { id: 3, icon: telegram, amount: 100, unit: 'members' },
    { id: 4, icon: linkedin, amount: 10, unit: 'followers' },
    { id: 5, icon: twitter, amount: 132, unit: 'followers' },
    { id: 6, icon: discord, amount: 61, unit: 'members' },
    { id: 7, icon: reddit, amount: 26, unit: 'trainers' },
    { id: 8, icon: instagram, amount: 16, unit: 'followers' },
]

const Community = () => {
    return (
        <div className="community-container">
            <div className="community-title">
                <div className="community-row">
                    <p>JOIN OUR</p>
                    <p className="community-amount">400K+</p>
                </div>
                <p>COMMUNITY</p>
            </div>
            <div className="card-list">
                {
                    communityData.map((item) => (
                        <div className="community-card">
                            <img className="community-icon" src={item.icon} alt={`${item.icon}`} />
                            <p className="community-followers">{item.amount}K {item.unit}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Community
