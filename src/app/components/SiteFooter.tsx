import React from 'react'

function SiteFooter() {
  return (
    <footer className="siteFooter container">
        <div className="sitefooter__main fp">
        <h5 className="siteFooter__title h1 uppercase italic">Tln Run Clubs</h5>
        </div>
        <div className="siteFooter__side fp">
        <p className="siteFooter__text">
            Buy me a coffee.
            This helps cover hosting & domain costs. Thank you 🙏
        </p>
        <a href="https://www.reihopsti.ee" target="_blank" rel="noopener noreferrer">Idea, design & code by <span>Rei Sikk</span></a>
        <span>All rights reserved © {new Date().getFullYear()}</span>
        </div>
    </footer>
  )
}

export default SiteFooter