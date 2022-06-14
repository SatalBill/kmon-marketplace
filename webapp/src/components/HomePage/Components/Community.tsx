import React from 'react'
import './Community.css'
import { facebook, medium, telegram, linkedin, twitter, discord, reddit, instagram } from '../../../images/community'

// type Props = {}

const communityData = [
    { id: 1, icon: facebook, amount: 58, unit: 'followers', link: 'https://www.facebook.com/KryptomonTeam/' },
    { id: 2, icon: medium, amount: 2.7, unit: 'followers', link: 'https://medium.com/kryptomon' },
    { id: 3, icon: telegram, amount: 100, unit: 'members', link: 'https://t.me/kryptomonofficial' },
    { id: 4, icon: linkedin, amount: 10, unit: 'followers', link: 'https://www.linkedin.com/company/the-kryptomon-company' },
    { id: 5, icon: twitter, amount: 132, unit: 'followers', link: 'https://twitter.com/kryptomonteam' },
    { id: 6, icon: discord, amount: 61, unit: 'members', link: 'https://discord.com/invite/hYRjSfsWXt' },
    { id: 7, icon: reddit, amount: 26, unit: 'trainers', link: 'https://www.reddit.com/r/Kryptomon/' },
    { id: 8, icon: instagram, amount: 16, unit: 'followers', link: 'https://www.instagram.com/kryptomonteam' }
]

const Community = () => {
    const openExternalLink = (link: string) => window.open(link, "_blank")
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
                        <div key={item.id} className="community-card" onClick={() => openExternalLink(item.link)}>
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
