import React from 'react'

function SiteFooter() {
  return (
    <footer className="siteFooter container">
        <div className="sitefooter__main fp">
          <h5 className="siteFooter__title h1 uppercase italic">Run Clubs Est</h5>
          <a href="https://www.reihopsti.ee" target="_blank" rel="noopener noreferrer">Idea, design & code by <span>Rei Sikk</span></a>
          <span>All rights reserved © {new Date().getFullYear()}</span>
        </div>
        <div className="siteFooter__side fp">
        <a
          className="siteFooter__bmac btn_main"
          target="_blank"
          href="https://www.buymeacoffee.com/tlnrunclubs"
          rel="noopener noreferrer"
        >
          <img
            className="coffeeImage"
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span className="txt-body">Buy me a coffee</span>
        </a>
        <p className="siteFooter__text">
            This helps cover hosting & domain costs.<br /> Thank you 🙏
        </p>
        </div>
    </footer>
  )
}

export default SiteFooter